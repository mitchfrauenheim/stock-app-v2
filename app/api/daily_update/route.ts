import { FinnhubQuote, PortfolioEntry } from "@/lib/definitions";
import { users } from "@/lib/initial_data";
import { NextRequest } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function updateStockPrices(): Promise<void> {
  const today = new Date().toISOString().split("T")[0];

  for (const user of users) {
    const stockIdResult =
      await sql`SELECT stock_id FROM holdings WHERE user_id = (SELECT id FROM users WHERE email = ${user.email})`;

    const userPortfolio: PortfolioEntry[] = [];

    for (const id of stockIdResult) {
      const symbolResult =
        await sql`SELECT symbol FROM stocks WHERE id = ${id.stock_id}`;
      const data = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbolResult[0].symbol}&token=${process.env.FINNHUB_API_KEY}`,
      );

      const stockQuote: FinnhubQuote = await data.json();
      userPortfolio.push({ stock_id: id.stock_id, close_price: stockQuote.pc });
    }
    await sql`INSERT INTO stock_prices (stock_id, price_date, close_price)
      VALUES ${sql(userPortfolio.map((entry) => [entry.stock_id, today, entry.close_price]))}
      ON CONFLICT (stock_id, price_date) DO NOTHING
    `;
    // console.log(userPortfolio);
    // break;
    // console.log(stockSymbols);
  }
}
// async function updateSnapshots(): Promise<void> {}

export function GET(request: NextRequest): Response {
  // const authHeader = request.headers.get("authorization");

  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  try {
    updateStockPrices();
    // updateSnapshots();
    return Response.json({ message: "Daily update successful" });
  } catch (error) {
    // TODO: Set up email client to email me if it fails
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
