import { fetchLeaderboard } from "@/api/data";
import { LeaderboardEntry } from "@/lib/definitions";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "../ui/item";

export default async function SimpleLeaderboard() {
  const leaderboard: LeaderboardEntry[] = await fetchLeaderboard();

  return (
    <div className="w-full lg:w-xs flex flex-col lg:border-r dashed-vertical">
      <div className="p-4 flex flex-col min-h-0 flex-1">
        <div className="pb-2 shrink-0">
          <h2 className="text-lg font-semibold font-sans">Leaderboard</h2>
        </div>
        <div className="overflow-y-auto">
          <ItemGroup className="gap-0">
            {leaderboard.map((person) => (
              <Item key={person.name}>
                <ItemContent>
                  <ItemTitle className="font-semibold">{person.name}</ItemTitle>
                  <ItemDescription className="hidden sm:inline">
                    {person.stocks.join(", ")}
                    {parseFloat(person.cash_balance) > 0 && ", Cash"}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>{person.total_value}</ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </div>
      </div>
    </div>
  );
}
