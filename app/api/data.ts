import { LeaderboardEntry } from "@/lib/definitions";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const leaderboardData = await sql<LeaderboardEntry[]>`
    SELECT 
      u.name,
      ps.total_value,
      ps.cash_balance,
      ARRAY_AGG(s.symbol ORDER BY s.symbol) as stocks
    FROM users u
    JOIN portfolio_snapshots ps ON u.id = ps.user_id
    JOIN holdings h ON u.id = h.user_id
    JOIN stocks s ON h.stock_id = s.id
    WHERE ps.snapshot_date = (SELECT MAX(snapshot_date) FROM portfolio_snapshots)
    GROUP BY u.name, ps.total_value, ps.cash_balance
    ORDER BY ps.total_value DESC
  `;

  return leaderboardData;
}
