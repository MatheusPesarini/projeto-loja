import CategoryPageComponent, { generateCategoryMetadata } from '@/components/product/CategoryPage';

export default function MenTshirtsPage() {
  return (
    <CategoryPageComponent
      category="camisetas_masculinas"
      displayName="Camisetas Masculinas"
      showFilters={true}
      gridCols={{ sm: 1, md: 2, lg: 3 }}
    />
  );
}

export async function generateMetadata() {
  return generateCategoryMetadata('camisetas_masculinas');
}
