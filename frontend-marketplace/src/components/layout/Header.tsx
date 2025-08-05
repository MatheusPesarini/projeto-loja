import type { JSX } from 'react';
import ThemeButton from './ThemeSwitchButton';
import { SearchBar } from './SearchBar';
import { MobileNav } from './MobileNav';
import { UserActions } from './UserActions';
import { DesktopNav } from './DesktopNav';

interface MenuItem {
  title: string;
  url: string;
  items?: MenuItem[];
}

type NavbarProps = {
  logo?: {
    url: string;
    title: string;
  };
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
};

export default function Header({
  logo = {
    url: '/',
    title: 'Loja',
  },
  isAuthenticated,
}: NavbarProps): JSX.Element {
  return (
    <section className="pt-4 bg-navbar dark:bg-navbar border-b">
      <div className="px-10">
        <nav className="hidden items-center lg:grid lg:grid-cols-3">
          <DesktopNav logo={logo} />

          <div className="flex items-center justify-self-end gap-2">
            <SearchBar className="w-48 h-8" placeholder="Procurar" />

            <UserActions isAuthenticated={isAuthenticated} />

            <ThemeButton />
          </div>
        </nav>

        <MobileNav isAuthenticated={isAuthenticated} logo={logo} />
      </div>
      <div className="h-[1px] mt-2"> </div>
    </section>
  );
}
