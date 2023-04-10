import { useGetProductsCountQuery } from './productApiSlice';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { Heading3, Heading4 } from '../../components/Typography';
import { StyledContainer } from '../../components/Container';
import { useNavigate } from 'react-router-dom';
import Flex from '../../components/Flex';

const ProductsCountCard = () => {
	const { data, isLoading } = useGetProductsCountQuery(null);
	const navigate = useNavigate();

	const handleClick = () => navigate('/admin/product-list');

	return isLoading ? (
		<p>Loading</p>
	) : (
		<StyledContainer
			onClick={handleClick}
			css={{ cursor: 'pointer', padding: '1rem' }}
		>
			<Flex align="center" justify="center">
				<MdProductionQuantityLimits
					style={{ height: '2.5rem', width: '2.5rem', marginRight: '1rem' }}
				/>{' '}
				<Heading4 size={{ '@initial': '1' }}>Total Products</Heading4>
			</Flex>

			<Heading3
				size={{ '@initial': '2' }}
				css={{ textAlign: 'center', mt: '1rem' }}
			>
				{data?.getProductsCount}
			</Heading3>
		</StyledContainer>
	);
};

export default ProductsCountCard;
