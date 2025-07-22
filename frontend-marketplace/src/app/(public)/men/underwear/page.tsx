import CategoryPageComponent, {
  generateCategoryMetadata,
} from "@/components/product/CategoryPage";

export default function MenUnderwearPage() {
  return (
    <CategoryPageComponent
      category="cuecas_masculinas"
      displayName="Cuecas Masculinas"
      showFilters={true}
      gridCols={{ sm: 1, md: 2, lg: 3 }}
    />
  );
}

export async function generateMetadata() {
  return generateCategoryMetadata("cuecas_masculinas");
}
