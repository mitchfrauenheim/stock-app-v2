import { fetchSnapshotsChartData, fetchUserFirstNames } from "./api/data";
import SimpleLeaderboard from "./components/overview/simple-leaderboard";
import SnapshotsChart from "./components/overview/snapshots-chart";
import { SnapshotsChartDataPoint } from "./lib/definitions";

export default async function Home() {
  const chartData: SnapshotsChartDataPoint[] = await fetchSnapshotsChartData();
  const firstNames: string[] = await fetchUserFirstNames();
  return (
    <div className="h-full w-full flex items-center justify-center font-mono">
      {/* <EmptyPage
        title="Page Under Construction"
        description="The Overview page is still under construction. Check back later!"
        icon={<HammerIcon />}
      /> */}
      <div className="w-full max-w-[1248] flex h-full mx-6 border-x dashed-vertical">
        <div className="flex flex-col w-full">
          <div className="lg:h-[388] flex flex-col lg:flex-row border-b dashed-horizontal">
            <SimpleLeaderboard />
            <div className="flex flex-1">
              <SnapshotsChart data={chartData} users={firstNames} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
