import { fetchLeaderboard } from "@/api/data";
import { LeaderboardEntry } from "@/lib/definitions";
import SimpleLeaderboardPosition from "./simple-leaderboard-position";
// import clsx from "clsx";
import {
  // Item,
  // ItemActions,
  // ItemContent,
  // ItemDescription,
  ItemGroup,
} from "../ui/item";

export default async function SimpleLeaderboard() {
  const leaderboard: LeaderboardEntry[] = await fetchLeaderboard();

  return (
    <div className="w-full lg:w-xs flex flex-col lg:border-r dashed-vertical">
      <div className="px-4 pt-4 flex flex-col min-h-0 flex-1">
        <div className="pb-2 shrink-0">
          <h2 className="text-lg font-semibold font-sans">Leaderboard</h2>
        </div>
        <div className="overflow-y-auto no-scrollbar relative">
          <ItemGroup className="gap-4 sm:gap-0">
            {leaderboard.map((person) => (
              <SimpleLeaderboardPosition key={person.name} person={person} />
            ))}
          </ItemGroup>
          <div className="hidden lg:block sticky bottom-0 left-0 h-8 bg-linear-to-t from-background to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
