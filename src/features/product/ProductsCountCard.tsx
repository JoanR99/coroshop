import styled from 'styled-components';
import { useGetProductsCountQuery } from './productApiSlice';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { Heading2, Heading4 } from '../../components/Typography';
import { StyledContainer } from '../../components/Container';
import { useNavigate } from 'react-router-dom';

const CountCard = styled(StyledContainer)`
	cursor: pointer;
`;

const HeadingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Count = styled(Heading2)`
	text-align: center;
`;

const ProductsCountCard = () => {
	const { data, isLoading } = useGetProductsCountQuery(null);
	const navigate = useNavigate();

	const handleClick = () => navigate('/admin/product-list');

	return isLoading ? (
		<p>Loading</p>
	) : (
		<CountCard onClick={handleClick}>
			<HeadingContainer>
				<MdProductionQuantityLimits
					style={{ height: '2.5rem', width: '2.5rem', marginRight: '1rem' }}
				/>{' '}
				<Heading4>Total Products</Heading4>
			</HeadingContainer>

			<Count>{data?.getProductsCount}</Count>
		</CountCard>
	);
};

export default ProductsCountCard;
