import styled from 'styled-components';
import { StyledLinkDark4 } from '../../components/StyledLink';
import { Heading3 } from '../../components/Typography';
import { useGetProductsQuery } from './productApiSlice';
import ProductCard from './ProductCard';

const StackContainer = styled.div`
	background-color: #a8dadc;
	padding: 2rem;
	border-radius: 30px;
`;

const LinkDiv = styled.div`
	align-self: center;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(12rem, 28rem));
	gap: 4rem;
	width: 100%;
	margin-top: 4rem;
	margin-bottom: 2rem;
	justify-content: center;
`;

const CategoryStack = ({ category }: { category: string }) => {
	const { data } = useGetProductsQuery({
		pageSize: 4,
		pageNumber: 1,
		keyword: '',
		category,
	});

	return (
		<StackContainer>
			<Heading3>{category}</Heading3>
			<Grid>
				{data?.getProducts.products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
				<LinkDiv>
					<StyledLinkDark4 to={`/categories/${category}`}>
						View more
					</StyledLinkDark4>
				</LinkDiv>
			</Grid>
		</StackContainer>
	);
};

export default CategoryStack;
