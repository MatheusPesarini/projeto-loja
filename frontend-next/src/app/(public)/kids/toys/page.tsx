import CategoryPageComponent, {
	generateCategoryMetadata,
} from '@/components/category-page/categoryPage';

export default function KidsToysPage() {
	return (
		<CategoryPageComponent
			category="brinquedos_kids"
			displayName="Brinquedos Infantis"
			showFilters={true}
			gridCols={{ sm: 1, md: 2, lg: 3 }}
		/>
	);
}

export async function generateMetadata() {
	return generateCategoryMetadata('brinquedos_kids', {});
}
