import type { Product } from "./definitions";

// === INTERFACES ===
export interface ProductCardProps {
  product: Product;
  variant?: "default" | "carousel" | "grid" | "featured";
  className?: string;
  showStock?: boolean;
}

export interface ProductGridProps {
  products: Product[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "sm" | "md" | "lg";
}

// === UTILITÁRIOS ===
export const formatPrice = (price: string | number | null | undefined): string => {
  if (!price || price === null || price === undefined) return "0,00";

  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price;

  if (Number.isNaN(numPrice)) return "0,00";

  return numPrice.toFixed(2).replace(".", ",");
};

// === CATEGORIA HELPERS ===
const categoryToUrlMap: { [key: string]: string } = {
  tenis_masculinos: "/men/sneakers",
  tenis_femininos: "/women/sneakers",
  calcas_masculinas: "/men/pants",
  calcas_femininas: "/women/pants",
  camisetas_masculinas: "/men/shirts",
  camisetas_femininas: "/women/shirts",
  acessorios: "/accessories",
  tenis_kids: "/kids/sneakers",
};

const categoryDisplayNames: { [key: string]: string } = {
  tenis_masculinos: "Tênis Masculinos",
  tenis_femininos: "Tênis Femininos",
  calcas_masculinas: "Calças Masculinas",
  calcas_femininas: "Calças Femininas",
  camisetas_masculinas: "Camisetas Masculinas",
  camisetas_femininas: "Camisetas Femininas",
  bolsas_femininas: "Bolsas Femininas",
};

export const getCategoryUrl = (category: string): string => {
  return categoryToUrlMap[category] || `/${category}`;
};

export const getCategoryDisplayName = (category: string | undefined): string => {
  if (!category) return "Categoria não especificada";

  return (
    categoryDisplayNames[category] ||
    category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );
};

export const MENU_ITEMS = [
  {
    title: "Masculino",
    items: [
      { title: "Camisetas", url: "/men/t-shirts" },
      { title: "Calças", url: "/men/pants" },
      { title: "Tênis", url: "/men/sneakers" },
      { title: "Cuecas", url: "/men/underwear" },
    ],
  },
  {
    title: "Feminino",
    items: [
      { title: "Camisetas", url: "/women/t-shirts" },
      { title: "Calças", url: "/women/pants" },
      { title: "Tênis", url: "/women/sneakers" },
      { title: "Bolsas", url: "/women/bags" },
    ],
  },
  {
    title: "Infantil",
    items: [
      { title: "Camisetas", url: "/kids/t-shirts" },
      { title: "Calças", url: "/kids/pants" },
      { title: "Tênis", url: "/kids/sneakers" },
      { title: "Brinquedos", url: "/kids/toys" },
    ],
  },
  {
    title: "Acessórios",
    items: [
      { title: "Relógios", url: "/accessories/watches" },
      { title: "Óculos", url: "/accessories/glasses" },
      { title: "Bolsas", url: "/accessories/bags" },
      { title: "Cintos", url: "/accessories/belts" },
    ],
  },
  {
    title: "Ofertas",
    items: [
      { title: "Promoções", url: "/offers/promotions" },
      { title: "Liquidações", url: "/offers/clearance" },
      { title: "Últimas Unidades", url: "/offers/last-units" },
    ],
  },
];
