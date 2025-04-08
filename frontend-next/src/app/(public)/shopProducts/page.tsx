import { getProductAction } from '@/lib/actions/product/getProduct';
import type { Product } from '@/lib/actions/definitions';

export default async function ShopProducts() {
	const products = await getProductAction();

	return (
		<div>
			<h1>Shop Products</h1>
			{products.data ? (
				<ul>
					{products.data.map((products: Product) => (
						<li key={products.id}>
							<h2>{products.name}</h2>
							<p>{products.description}</p>
							<p>Price: {products.price}</p>
							<p>Category: {products.category}</p>
							<img src={products.image} alt={products.name} />
						</li>
					))}
				</ul>
			) : (
				<p>{products.message}</p>
			)}
		</div>
	);
}
