import CategoryPageComponent, {
  generateCategoryMetadata,
} from "@/components/product/CategoryPage";

export default function WomenSneakersPage() {
  return (
    <CategoryPageComponent
      category="tenis_femininos"
      displayName="Tênis Femininos"
      showFilters={true}
      gridCols={{ sm: 1, md: 2, lg: 3 }}
    />
  );
}

export async function generateMetadata() {
  return generateCategoryMetadata("tenis_femininos", {});
}
