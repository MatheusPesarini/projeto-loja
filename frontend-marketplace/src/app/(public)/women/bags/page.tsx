import CategoryPageComponent, {
  generateCategoryMetadata,
} from "@/components/product/CategoryPage";

export default function WomenBagsPage() {
  return (
    <CategoryPageComponent
      category="bolsas_femininas"
      displayName="Bolsas Femininas"
      showFilters={true}
      gridCols={{ sm: 1, md: 2, lg: 3 }}
    />
  );
}

export async function generateMetadata() {
  return generateCategoryMetadata("bolsas_femininas", {
    title: "Bolsas Femininas - Moda e Estilo",
    description:
      "Explore nossa coleção de bolsas femininas, perfeitas para complementar seu estilo. Encontre a bolsa ideal para cada ocasião.",
  });
}
