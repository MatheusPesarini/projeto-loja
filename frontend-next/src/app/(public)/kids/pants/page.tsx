import CategoryPageComponent, {
	generateCategoryMetadata,
} from '@/components/product/categoryPage';

export default function KidsPantsPage() {
	return (
		<CategoryPageComponent
			category="calcas_kids"
			displayName="Calças Infantis"
			showFilters={true}
			gridCols={{ sm: 1, md: 2, lg: 3 }}
		/>
	);
}

export async function generateMetadata() {
	return generateCategoryMetadata('calcas_kids', {
		title: 'Calças Infantis - Loja Online',
		description:
			'Explore nossa coleção de calças infantis, com estilos variados para todas as idades. Encontre a calça perfeita para o seu pequeno.',
	});
}
