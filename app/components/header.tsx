import {
  NavigationMenu,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Header() {
  return (
    <div className="py-6 px-8 w-full border-b dashed-horizontal">
      <h1 className="font-sans text-xl font-semibold">Stock Club Analytics</h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>Overview</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
