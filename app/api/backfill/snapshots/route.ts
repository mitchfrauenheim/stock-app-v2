import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function backfillSnapshots(): Promise<void> {
  const usersResult = await sql`SELECT id, email FROM users`;

  for (const user of usersResult) {
    // get all stock close price from stock prices for up to 4 stock ids, order by price_date
    // compute balance for each date, add cash if user holds cash
    const snapshotData = await sql`
      SELECT sp.price_date, SUM(h.shares * sp.close_price) as total_stock_value
      FROM holdings h
      JOIN stock_prices sp ON h.stock_id = sp.stock_id
      WHERE h.user_id = ${user.id}
      GROUP BY sp.price_date
      ORDER BY sp.price_date
    `;

    const investedFundsData = await sql`
      SELECT SUM(shares * buy_cost) as total_invested
      FROM holdings
      WHERE user_id = ${user.id}
    `;

    const totalInvestedFunds = Math.round(
      parseFloat(investedFundsData[0].total_invested) || 0,
    );
    const cashBalance = 20000 - totalInvestedFunds;
    const preparedSnapshots = snapshotData.map((day) => [
      user.id,
      day.price_date,
      parseFloat(day.total_stock_value) + cashBalance,
      cashBalance,
    ]);

    if (preparedSnapshots.length > 0) {
      await sql`
      INSERT INTO portfolio_snapshots (user_id, snapshot_date, total_value, cash_balance)
      VALUES ${sql(preparedSnapshots)}
      ON CONFLICT (user_id, snapshot_date) DO NOTHING
      `;
    }

    console.log(snapshotData);
  }
}

export async function GET(): Promise<Response> {
  try {
    await backfillSnapshots();
    return Response.json({ message: "Snapshots backfilled successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
