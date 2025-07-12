import CategoryPageComponent, {
	generateCategoryMetadata,
} from '@/components/product/CategoryPage';

export default function MenPantsPage() {
	return (
		<CategoryPageComponent
			category="calcas_masculinas"
			displayName="Calças Masculinas"
			showFilters={true}
			gridCols={{ sm: 1, md: 2, lg: 3 }}
		/>
	);
}

export async function generateMetadata() {
	return generateCategoryMetadata('calcas_masculinas', {
		title: 'Calças Masculinas - Loja Online',
		description:
			'Explore nossa coleção de calças masculinas, com estilos variados para todas as ocasiões. Encontre a calça perfeita para você.',
	});
}
