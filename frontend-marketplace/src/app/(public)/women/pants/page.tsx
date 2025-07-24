import CategoryPageComponent, { generateCategoryMetadata } from "@/components/product/CategoryPage";

export default function WomenPantsPage() {
  return (
    <CategoryPageComponent
      category="calcas_femininas"
      displayName="Calças Femininas"
      showFilters={true}
      gridCols={{ sm: 1, md: 2, lg: 3 }}
    />
  );
}

export async function generateMetadata() {
  return generateCategoryMetadata("calcas_femininas", {});
}
