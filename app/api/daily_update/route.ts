import { FinnhubQuote, StockCloseEntry } from "@/lib/definitions";
import { US_MARKET_HOLIDAYS_2026 } from "@/lib/initial_data";
import { NextRequest } from "next/server";
import postgres from "postgres";
import { Resend } from "resend";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
const resend = new Resend(process.env.RESEND_API_KEY);
const today = new Date().toISOString().split("T")[0];

async function updateStockPrices(): Promise<void> {
  const stocksResult = await sql`SELECT id, symbol FROM stocks`;
  const stockPrices: StockCloseEntry[] = [];

  for (const stock of stocksResult) {
    const data = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${process.env.FINNHUB_API_KEY}`,
    );

    const stockQuote: FinnhubQuote = await data.json();
    stockPrices.push({ stock_id: stock.id, close_price: stockQuote.c });
  }

  await sql`INSERT INTO stock_prices (stock_id, price_date, close_price)
      VALUES ${sql(stockPrices.map((stock) => [stock.stock_id, today, stock.close_price]))}
      ON CONFLICT (stock_id, price_date) DO NOTHING
    `;

  console.log(`Stock prices updated for ${today}`);
}

async function updateSnapshots(): Promise<void> {
  const usersResult = await sql`SELECT id, email FROM users`;

  for (const user of usersResult) {
    console.log(user);
    const snapshotData = await sql`
      SELECT SUM(h.shares * sp.close_price) as total_stock_value
      FROM holdings h
      JOIN stock_prices sp ON h.stock_id = sp.stock_id
      WHERE h.user_id = ${user.id} AND sp.price_date = ${today}
    `;

    const investedFundsData = await sql`
      SELECT SUM(shares * buy_cost) as total_invested
      FROM holdings
      WHERE user_id = ${user.id}
    `;

    const totalStockValue = parseFloat(snapshotData[0]?.total_stock_value) || 0;
    const totalInvestedFunds = Math.round(
      parseFloat(investedFundsData[0]?.total_invested) || 0,
    );
    const cashBalance = 20000 - totalInvestedFunds;
    const totalValue = totalStockValue + cashBalance;

    await sql`
    INSERT INTO portfolio_snapshots (user_id, snapshot_date, total_value, cash_balance)
    VALUES (${user.id}, ${today}, ${totalValue}, ${cashBalance})
    ON CONFLICT (user_id, snapshot_date) DO NOTHING
    `;
  }
  console.log(`User portfolios updated for ${today}`);
}

async function sendErrorEmail(errorMessage: string): Promise<void> {
  try {
    await resend.emails.send({
      from: "Frauenheim Stock Club <dev@updates.frauenheim-stock-club.app>",
      to: ["mitch.frauenheim@gmail.com"],
      subject: `${today} Daily Update Failure`,
      html: `<p>Daily update failed on ${today} with the following error: ${errorMessage}</p>`,
    });
  } catch (emailError) {
    const emailErrorMessage =
      emailError instanceof Error ? emailError.message : "Unknown error";
    console.log("Failed to send error email:", emailErrorMessage);
  }
}

export async function GET(request: NextRequest): Promise<Response> {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    if (US_MARKET_HOLIDAYS_2026.has(today)) {
      throw new Error(
        `Daily update skipped for ${US_MARKET_HOLIDAYS_2026.get(today)}`,
      );
    }
    await updateStockPrices();
    await updateSnapshots();
    return Response.json({ message: "Daily update successful" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.log("Daily update failed:", errorMessage);
    await sendErrorEmail(errorMessage);
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
