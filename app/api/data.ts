import { FinnhubQuote, LeaderboardEntry, StockHolding } from "@/lib/definitions";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const today = new Date().toLocaleDateString("en-CA");

  const todaySnapshot = await sql`
    SELECT COUNT(*) as count 
    FROM portfolio_snapshots 
    WHERE snapshot_date = ${today}
  `;

  console.error(today);
  if (todaySnapshot[0].count > 0) {
    console.error("fetching from db");
    return fetchStoredLeaderboard(today);
  } else {
    console.error("fetching from finnhub");
    return fetchLiveLeaderboard();
  }
}

async function fetchStoredLeaderboard(date: string): Promise<LeaderboardEntry[]> {
  const leaderboardData = await sql<LeaderboardEntry[]>`
  SELECT 
    u.name,
    ps.total_value,
    ps.cash_balance,
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'symbol', s.symbol,
        'name', s.name,
        'value', ROUND((h.shares * sp.close_price)::numeric, 2)
      ) ORDER BY s.symbol
    ) as stocks
  FROM users u
  JOIN portfolio_snapshots ps ON u.id = ps.user_id
  JOIN holdings h ON u.id = h.user_id
  JOIN stocks s ON h.stock_id = s.id
  JOIN stock_prices sp ON s.id = sp.stock_id
  WHERE ps.snapshot_date = ${date}
    AND sp.price_date = ps.snapshot_date
  GROUP BY u.name, ps.total_value, ps.cash_balance
  ORDER BY ps.total_value DESC
  `;

  return leaderboardData;
}

async function fetchLiveLeaderboard(): Promise<LeaderboardEntry[]> {
  const users = await sql`SELECT id, name FROM users`;
  const leaderboard: LeaderboardEntry[] = [];

  for (const user of users) {
    const holdings = await sql`
      SELECT h.shares, s.symbol, s.name, h.stock_id
      FROM holdings h
      JOIN stocks s ON h.stock_id = s.id
      WHERE h.user_id = ${user.id}
    `;

    let totalStockValue = 0;
    const stockSymbols: StockHolding[] = [];

    for (const holding of holdings) {
      const data = await fetch(`https://finnhub.io/api/v1/quote?symbol=${holding.symbol}&token=${process.env.FINNHUB_API_KEY}`);
      const quote: FinnhubQuote = await data.json();
      const stockValue = holding.shares * quote.c;
      totalStockValue += stockValue;

      stockSymbols.push({
        symbol: holding.symbol,
        name: holding.name,
        value: parseFloat(stockValue.toFixed(2)),
      });
    }

    const investedResult = await sql`
      SELECT SUM(shares * buy_cost) as total_invested
      FROM holdings WHERE user_id = ${user.id}
    `;
    const cashBalance = 20000 - Math.round(parseFloat(investedResult[0]?.total_invested || "0"));

    leaderboard.push({
      name: user.name,
      total_value: (totalStockValue + cashBalance).toFixed(2),
      cash_balance: cashBalance.toFixed(2),
      stocks: stockSymbols.sort(),
    });
  }

  return leaderboard.sort((a, b) => parseFloat(b.total_value) - parseFloat(a.total_value));
}
