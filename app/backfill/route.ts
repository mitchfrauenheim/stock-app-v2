import { TwelvedataTimeSeries } from "@/lib/definitions";
import { stocks } from "@/lib/initial_data";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function backfill(): Promise<void> {
  for (const stock of stocks) {
    const stock_id =
      await sql`SELECT id FROM stocks WHERE symbol = ${stock.symbol}`;
    const data = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${stock.symbol}&start_date=2026-01-01&interval=1day&apikey=${process.env.TWELVEDATA_API_KEY}`,
    );
    const stockData: TwelvedataTimeSeries = await data.json();
    console.log(stockData.values);
    // TODO: Map through the date values to create values to insert to stock_prices db table

    await new Promise((resolve) => setTimeout(resolve, 8000));
  }
}

export async function GET(): Promise<Response> {
  try {
    await backfill();
    return Response.json({ message: "backfill page" });
  } catch (error) {
    return Response.json({ error });
  }
}
