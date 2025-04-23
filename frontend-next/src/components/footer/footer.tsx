import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

type FooterProps = {
  logo?: {
    url: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  logo = {
    url: "/",
    title: "PatoLoja",
  },
  menuItems = [
    {
      title: "Produtos",
      links: [
        { text: "Masculino", url: "/men" },
        { text: "Feminino", url: "/women" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { text: "Sobre", url: "/about" },
        { text: "Contato", url: "/contact" },
      ],
    },
    {
      title: "Outros",
      links: [
        { text: "Ajuda", url: "/help" },
        { text: "Perfil", url: "/profile" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Instagram", url: "https://www.instagram.com/math_pesarini/" },
        { text: "LinkedIn", url: "https://www.linkedin.com/in/matheus-rogerio-pesarini/" },
      ],
    },
  ],
  copyright = "© 2025 patoloja.com. Todos direitos reservados.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: FooterProps) => {
  return (
    <section className="pt-6 pb-2 bg-gray-100 dark:bg-gray-900">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-10 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Link href={logo.url} className="flex items-center gap-2">
                  <Image src="/Pato_pocoyo.webp" alt="Shop picture" width={50} height={50} />
                  <span className="text-lg font-semibold tracking-tighter">
                    {logo.title}
                  </span>
                </Link>
              </div>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <Link href={link.url}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="px-4 mt-10 border-t pt-4"> {/* Ajuste mt-12 conforme necessário */}
            <div className="flex flex-col justify-between gap-4 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
              <p>{copyright}</p>
              <ul className="flex gap-4">
                {bottomLinks.map((link, linkIdx) => (
                  <li key={linkIdx} className="underline hover:text-primary">
                    <Link href={link.url}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
    </section>
  );
};

export { Footer };
