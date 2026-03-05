import EmptyPage from "@/components/ui/empty-page";
import { DevicesIcon, HammerIcon } from "@phosphor-icons/react/ssr";

export default function Page() {
  return (
    <div className="h-2/3 w-full flex items-center justify-center font-mono">
      <EmptyPage
        title="Page Under Construction"
        description="The Visualizations page is still under construction. Check back later!"
        icon={<HammerIcon />}
        className="hidden sm:flex"
      />
      <EmptyPage
        title="Page Not Optimized"
        description="The Visualizations page is not optimized for mobile viewing. Please revisit the page on a larger device."
        icon={<DevicesIcon />}
        className="flex sm:hidden"
      />
    </div>
  );
}
