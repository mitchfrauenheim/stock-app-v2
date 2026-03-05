"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    path: "/leaderboard",
  },
  {
    pageName: "Visualizations",
    path: "/visualizations",
  },
];

export function Header() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="px-8 py-4 min-w-screen border-b dashed-horizontal">
      <div className="grid grid-cols-2 md:grid-cols-3">
        <h1 className="font-sans text-xl font-medium content-center">
          Stock Club Analytics
        </h1>
        <div className="justify-self-center font-mono md:inline hidden">
          <NavigationMenu>
            <NavigationMenuList>
              {navMenuLinks.map((menuLink) => (
                <NavigationMenuItem key={menuLink.pageName}>
                  <NavigationMenuLink
                    asChild
                    className={clsx(navigationMenuTriggerStyle(), {
                      "font-medium": pathname === menuLink.path,
                    })}
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
