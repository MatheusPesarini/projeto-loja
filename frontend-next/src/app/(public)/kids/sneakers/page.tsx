import CategoryPageComponent, {
	generateCategoryMetadata,
} from '@/components/category-page/categoryPage';

export default function KidsSneakersPage() {
	return (
		<CategoryPageComponent
			category="tenis_kids"
			displayName="Tênis Infantis"
			showFilters={true}
			gridCols={{ sm: 1, md: 2, lg: 3 }}
		/>
	);
}

export async function generateMetadata() {
	return generateCategoryMetadata('tenis_kids', {});
}
