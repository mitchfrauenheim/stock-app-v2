import { TwelvedataTimeSeries } from "@/lib/definitions";
import { stocks } from "@/lib/initial_data";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function backfillStockPrices(): Promise<void> {
  for (const stock of stocks) {
    const result =
      await sql`SELECT id FROM stocks WHERE symbol = ${stock.symbol}`;
    const stockId: string = result[0].id;
    const data = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${stock.symbol}&start_date=2026-01-01&interval=1day&apikey=${process.env.TWELVEDATA_API_KEY}`,
    );
    const stockData: TwelvedataTimeSeries = await data.json();
    await sql`
      INSERT INTO stock_prices (stock_id, price_date, close_price)
      VALUES ${sql(stockData.values.map((day) => [stockId, day.datetime, parseFloat(day.close)]))}
    `;

    console.log(`${stock.symbol} completed`);
    await new Promise((resolve) => setTimeout(resolve, 8000));
  }
}

export async function GET(): Promise<Response> {
  try {
    await backfillStockPrices();
    return Response.json({ message: "Stock data backfilled successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
