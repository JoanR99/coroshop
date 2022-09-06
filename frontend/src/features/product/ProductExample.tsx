import { useGetProductsQuery } from '../api/apiSlice';

const ProductExample = () => {
	const { isLoading, error, data } = useGetProductsQuery({
		pageNumber: 1,
		pageSize: 3,
		keyword: '',
	});

	console.log(data);

	return isLoading ? (
		<p>Loading</p>
	) : error ? (
		<p>error</p>
	) : (
		<div>
			{data?.getProducts.products.map((product) => (
				<div key={product.id}>
					<h2>{product.name}</h2>
					<p>Brand: {product.brand}</p>
					<p>Price: {product.price}</p>
				</div>
			))}
		</div>
	);
};

export default ProductExample;
