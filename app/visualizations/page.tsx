import { Button } from "@/components/ui/button";
import EmptyPage from "@/components/ui/empty-page";
import {
  ArrowUpRightIcon,
  DevicesIcon,
  HammerIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

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
      >
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          <Link href="/">
            Overview Page <ArrowUpRightIcon />
          </Link>
        </Button>
      </EmptyPage>
    </div>
  );
}
