import { HammerIcon } from "@phosphor-icons/react/ssr";
import EmptyPage from "./components/ui/empty-page";

export default function Home() {
  return (
    <div className="h-2/3 w-full flex items-center justify-center font-mono">
      <EmptyPage
        title="Page Under Construction"
        description="The Overview page is still under construction. Check back later!"
        icon={<HammerIcon />}
      />
    </div>
  );
}
