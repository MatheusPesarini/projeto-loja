import { Store } from 'lucide-react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigationMenu';
import { MENU_ITEMS } from '@/lib/types/product';

export function DesktopNav({ logo }: { logo: { url: string; title: string } }) {
  return (
    <>
      <Link href={logo.url} className="flex items-center gap-2 justify-self-start">
        {/* <Image src="/Pato_pocoyo.webp" alt="Shop picture" width={50} height={50} /> */}
        <Store className="size-8" data-testid="store-icon" />
        <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
      </Link>

      <div className="flex items-center justify-self-center">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            {MENU_ITEMS.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-popover text-popover-foreground z-50">
                      {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-80">
                          <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.items || '#'}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}

const SubMenuLink = ({ item }: { item: { title: string; url: string } }) => {
  return (
    <Link
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
      </div>
    </Link>
  );
};
