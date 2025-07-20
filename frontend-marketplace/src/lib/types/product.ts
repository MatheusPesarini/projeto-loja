import type { Product } from "./definitions";

// === INTERFACES ===
export interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'carousel' | 'grid' | 'featured';
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
  gap?: 'sm' | 'md' | 'lg';
}

// === UTILITÁRIOS ===
export const formatPrice = (price: string | number | null | undefined): string => {
  if (!price || price === null || price === undefined) return '0,00';
  
  const numPrice = typeof price === 'string' ? Number.parseFloat(price) : price;
  
  if (Number.isNaN(numPrice)) return '0,00';
  
  return numPrice.toFixed(2).replace('.', ',');
};

// === CATEGORIA HELPERS ===
const categoryToUrlMap: { [key: string]: string } = {
  tenis_masculinos: '/men/sneakers',
  tenis_femininos: '/women/sneakers',
  calcas_masculinas: '/men/pants',
  calcas_femininas: '/women/pants',
  camisetas_masculinas: '/men/shirts',
  camisetas_femininas: '/women/shirts',
  acessorios: '/accessories',
  tenis_kids: '/kids/sneakers',
};

const categoryDisplayNames: { [key: string]: string } = {
  tenis_masculinos: 'Tênis Masculinos',
  tenis_femininos: 'Tênis Femininos',
  calcas_masculinas: 'Calças Masculinas',
  calcas_femininas: 'Calças Femininas',
  camisetas_masculinas: 'Camisetas Masculinas',
  camisetas_femininas: 'Camisetas Femininas',
  bolsas_femininas: 'Bolsas Femininas',
};

export const getCategoryUrl = (category: string): string => {
  return categoryToUrlMap[category] || `/${category}`;
};

export const getCategoryDisplayName = (category: string | undefined): string => {
  if (!category) return 'Categoria não especificada';
  
  return categoryDisplayNames[category] || 
         category.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};