'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion } from '@/components/ui/accordion';
import LogoutButton from '../forms/LogoutButton';
import { renderMobileMenuItem } from '../ui/renderMobileMenuItem';
import { MENU_ITEMS } from '@/lib/types/product';

const auth = {
  login: { url: '/login', title: 'Entrar' },
  signup: { url: '/signup', title: 'Registrar' },
};

interface MobileNavProps {
  isAuthenticated: boolean;
  logo: {
    url: string;
    title: string;
  };
}

export function MobileNav({ isAuthenticated, logo }: MobileNavProps) {
  return (
    <div className="block lg:hidden">
      <div className="flex items-center justify-between">
        <Link href={logo.url} className="flex items-center gap-2">
          {/* <Image src="/Pato_pocoyo.webp" alt="Shop picture" width={50} height={50} /> */}
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <Link href={logo.url} className="flex items-center gap-2">
                  {/* <Image src="/Pato_pocoyo.webp" alt="Shop picture" width={50} height={50} /> */}
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 p-4">
              <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                {MENU_ITEMS.map((item) => renderMobileMenuItem(item))}
              </Accordion>

              <div className="flex flex-col gap-3">
                {isAuthenticated ? (
                  <LogoutButton />
                ) : (
                  <>
                    <Button asChild variant="outline" size="sm">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
