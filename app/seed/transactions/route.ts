import { holdings } from "@/lib/initial_data";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedTransactions(): Promise<void> {
  await Promise.all(
    holdings.flatMap((holding) =>
      holding.stocks.map((stock) => {
        const total_value =
          Math.round(stock.buy_cost * stock.shares * 100) / 100;
        const transaction_date = "2026-01-02";

        return sql`
            INSERT INTO transactions (user_id, stock_id, transaction_type, shares, price_per_share, total_value, transaction_date)
            VALUES (
              (SELECT id FROM users WHERE email = ${holding.email}),
              (SELECT id FROM stocks WHERE symbol = ${stock.symbol}),
              'BUY',
              ${stock.shares},
              ${stock.buy_cost},
              ${total_value},
              ${transaction_date}
            )
            ON CONFLICT (id) DO NOTHING;
          `;
      }),
    ),
  );
}

export async function GET(): Promise<Response> {
  try {
    await seedTransactions();
    return Response.json({ message: "Transactions seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
