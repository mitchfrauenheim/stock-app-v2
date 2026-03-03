import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";

type NavMenuLink = {
  pageName: string;
  path: string;
};

const navMenuLinks: NavMenuLink[] = [
  {
    pageName: "Overview",
    path: "/",
  },
  {
    pageName: "Leaderboard",
    path: "/",
  },
  {
    pageName: "Historical Data",
    path: "/",
  },
];

export function Header() {
  return (
    <div className="px-8 py-4 w-full border-b dashed-horizontal">
      <div className="grid grid-cols-3">
        <h1 className="font-sans text-xl font-semibold content-center">
          Stock Club Analytics
        </h1>
        <div className="justify-self-center">
          <NavigationMenu>
            <NavigationMenuList>
              {navMenuLinks.map((menuLink) => (
                <NavigationMenuItem key={menuLink.pageName}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={menuLink.path}>{menuLink.pageName}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Link
          href="https://github.com/mitchfrauenheim/stock-app-v2"
          className="font-medium justify-self-end content-center"
        >
          <GithubLogoIcon size={24} />
        </Link>
      </div>
    </div>
  );
}
