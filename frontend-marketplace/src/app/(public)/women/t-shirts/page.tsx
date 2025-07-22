import CategoryPageComponent, {
  generateCategoryMetadata,
} from "@/components/product/CategoryPage";

export default function WomenTshirtsPage() {
  return (
    <CategoryPageComponent
      category="camisetas_femininas"
      displayName="Camisetas Femininas"
      showFilters={true}
      gridCols={{ sm: 1, md: 2, lg: 3 }}
    />
  );
}

export async function generateMetadata() {
  return generateCategoryMetadata("camisetas_femininas", {});
}
