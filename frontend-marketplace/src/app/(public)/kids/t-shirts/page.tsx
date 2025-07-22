import CategoryPageComponent, {
  generateCategoryMetadata,
} from "@/components/product/CategoryPage";

export default function KidsTshirtsPage() {
  return (
    <CategoryPageComponent
      category="camisetas_kids"
      displayName="Camisetas Infantis"
      showFilters={true}
      gridCols={{ sm: 1, md: 2, lg: 3 }}
    />
  );
}

export async function generateMetadata() {
  return generateCategoryMetadata("camisetas_kids", {});
}
