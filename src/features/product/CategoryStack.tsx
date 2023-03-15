import Spinner from '../../components/Spinner';
import { useGetProductsQuery } from './productApiSlice';
import ProductStack from './ProductStack';

type Props = {
	category: string;
};

const CategoryStack = ({ category }: Props) => {
	const { data, isLoading, isError } = useGetProductsQuery({
		category,
		pageSize: 4,
		pageNumber: 1,
		keyword: '',
	});

	return isLoading ? (
		<Spinner />
	) : isError ? (
		<div>Error</div>
	) : (
		<ProductStack products={data?.getProducts.products!} category={category} />
	);
};

export default CategoryStack;
