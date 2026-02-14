import { FinnhubQuote, StockCloseEntry } from "@/lib/definitions";
import { NextRequest } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function updateStockPrices(): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  const stocksResult = await sql`SELECT id, symbol FROM stocks`;
  const stockPrices: StockCloseEntry[] = [];

  for (const stock of stocksResult) {
    const data = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${process.env.FINNHUB_API_KEY}`,
    );

    const stockQuote: FinnhubQuote = await data.json();
    stockPrices.push({ stock_id: stock.id, close_price: stockQuote.c });
  }

  // TODO: uncomment to add daily stock prices to db
  await sql`INSERT INTO stock_prices (stock_id, price_date, close_price)
      VALUES ${sql(stockPrices.map((stock) => [stock.stock_id, today, stock.close_price]))}
      ON CONFLICT (stock_id, price_date) DO NOTHING
    `;

  console.log(`Stock prices updated for ${today}`);
}

async function updateSnapshots(): Promise<void> {
  const usersResult = await sql`SELECT id, email FROM users`;
}

export function GET(request: NextRequest): Response {
  // const authHeader = request.headers.get("authorization");

  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  try {
    updateStockPrices();
    updateSnapshots();
    return Response.json({ message: "Daily update successful" });
  } catch (error) {
    // TODO: Set up email client to email me if it fails
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
