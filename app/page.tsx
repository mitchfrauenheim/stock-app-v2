import SimpleLeaderboard from "./components/overview/simple-leaderboard";
export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center font-mono">
      {/* <EmptyPage
        title="Page Under Construction"
        description="The Overview page is still under construction. Check back later!"
        icon={<HammerIcon />}
      /> */}
      <div className="w-full max-w-[1248] flex h-full mx-6 border-x dashed-vertical">
        <div className="flex flex-col w-full">
          <div className="flex flex-col lg:flex-row lg:h-sm border-b dashed-horizontal">
            <SimpleLeaderboard />
            <div className="flex flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
