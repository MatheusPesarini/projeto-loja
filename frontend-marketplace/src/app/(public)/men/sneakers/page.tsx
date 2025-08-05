import CategoryPageComponent, { generateCategoryMetadata } from '@/components/product/CategoryPage';

export default function MenSneakersPage() {
  return (
    <CategoryPageComponent
      category="tenis_masculinos"
      displayName="Tênis Masculinos"
      showFilters={true}
      gridCols={{ sm: 1, md: 2, lg: 3 }}
    />
  );
}

export async function generateMetadata() {
  return generateCategoryMetadata('tenis_masculinos', {
    title: 'Tênis Masculinos - Loja Online',
    description:
      'Explore nossa coleção de tênis masculinos, com estilos variados para todas as ocasiões. Encontre o tênis perfeito para você.',
  });
}
