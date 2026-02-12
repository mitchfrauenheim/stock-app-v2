import { users } from "@/lib/initial_data";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function backfillSnapshots(): Promise<void> {
  for (const user of users) {
    // get all stock close price from stock prices for up to 4 stock ids, order by price_date
    // compute balance for each date, add cash if user holds cash
    const idResult = await sql`
      SELECT stock_id FROM holdings WHERE user_id = ${user.id}
    `;
    console.log(idResult);
  }
}

export async function GET(): Promise<Response> {
  try {
    backfillSnapshots();
    return Response.json({ message: "Snapshots backfilled successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
