import { NextResponse } from "next/server";

async function dailyStockPriceUpdate(): Promise<void> {
  console.log("hello world");
}

export function GET(request: Request): Response {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    dailyStockPriceUpdate();
    return Response.json({ message: "Daily update successful" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
