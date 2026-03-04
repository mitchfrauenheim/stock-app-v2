import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { HammerIcon } from "@phosphor-icons/react/ssr";

export default function Page() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Empty className="w-1/3">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HammerIcon />
          </EmptyMedia>
          <EmptyTitle>Page Under Construction</EmptyTitle>
          <EmptyDescription>
            The Leaderboard page is still under construction. Check back later!
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
