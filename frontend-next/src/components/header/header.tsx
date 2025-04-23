import { Menu } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "../logoutButton/logoutButton";

interface MenuItem {
  title: string;
  url: string;
  items?: MenuItem[];
}

type Navbar1Props = {
  logo?: {
    url: string;
    title: string;
  }
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  isAuthenticated: boolean;
}

export default function Navbar({
  logo = {
    url: "/",
    title: "PatoLoja",
  },
  menu = [
    {
      title: "Masculino",
      url: "/men",
      items: [
        {
          title: "Camisetas",
          url: "/men/t-shirts",
        },
        {
          title: "Calças",
          url: "/men/pants",
        },
        {
          title: "Tênis",
          url: "/men/sneakers",
        },
        {
          title: "Cuecas",
          url: "/men/underwear",
        },
      ],
    },
    {
      title: "Feminino",
      url: "/women",
      items: [
        {
          title: "Camisetas",
          url: "/women/t-shirts",
        },
        {
          title: "Calças",
          url: "/women/pants",
        },
        {
          title: "Tênis",
          url: "/women/sneakers",
        },
        {
          title: "Bolsas",
          url: "/women/bags",
        },
      ],
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Cadastro", url: "/register" },
  },
  isAuthenticated,
}: Navbar1Props): JSX.Element {
  return (
    <section className="py-4">
      <div className="px-10">
        <nav className="hidden justify-between lg:flex">
          <Link href={logo.url} className="flex items-center gap-2">
            <Image src="/Pato_pocoyo.webp" alt="Shop picture" width={50} height={50} />
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            {isAuthenticated ? (
              <>
                <LogoutButton />
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>
                <Button asChild size="sm">
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <Image src="/Pato_pocoyo.webp" alt="Shop picture" width={50} height={50} />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <Image src="/Pato_pocoyo.webp" alt="Shop picture" width={50} height={50} />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {isAuthenticated ? (
                      <>
                        <LogoutButton />
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline" size="sm">
                          <a href={auth.login.url}>{auth.login.title}</a>
                        </Button>
                        <Button asChild size="sm">
                          <a href={auth.signup.url}>{auth.signup.title}</a>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 h-[1px] my-2">
        {" "}
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link href={item.url} legacyBehavior passHref>
        <NavigationMenuLink
          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
        >
          {item.title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 pl-4">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} isMobile={true} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground" // Estilo de link móvel
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item, isMobile = false }: { item: MenuItem, isMobile?: boolean }) => {
  const linkClasses = isMobile
    ? "block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    : "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer";

  return (
    <Link
      href={item.url}
      className={linkClasses}
    >
      <div className="text-sm font-medium leading-none">{item.title}</div>
    </Link>
  );
};