import { AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import Link from 'next/link';

interface MenuItem {
  title: string;
  url?: string;
  items?: MenuItem[];
}

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url || '#'}
    >
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
      </div>
    </Link>
  );
};

export const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 pl-4">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url || '#'}
      className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground" // Estilo de link móvel
    >
      {item.title}
    </Link>
  );
};
