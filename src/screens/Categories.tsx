import styled from 'styled-components';
import { LinkButton } from '../components/Button';
import { Container, StyledContainer } from '../components/Container';
import { StyledLinkDark4 } from '../components/StyledLink';
import { Heading2, Heading3 } from '../components/Typography';
import { useGetProductsQuery } from '../features/product/productApiSlice';
import ProductCard from '../features/product/ProductCard';

const CATEGORIES = ['Phones', 'Laptops', 'Accessories', 'TV'];

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(12rem, 28rem));
	gap: 4rem;
	width: 100%;
	margin-top: 4rem;
	margin-bottom: 2rem;
	justify-content: center;
`;

const FlexColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6rem;
`;

const LinkDiv = styled.div`
	align-self: center;
`;

const CategoryStack = ({ category }: { category: string }) => {
	const { data } = useGetProductsQuery({
		pageSize: 4,
		pageNumber: 1,
		keyword: '',
		category,
	});

	return (
		<div>
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
		</div>
	);
};

const Categories = () => {
	return (
		<Container>
			<Heading2>Categories</Heading2>
			<FlexColumn>
				{CATEGORIES.map((category) => (
					<CategoryStack category={category} />
				))}
			</FlexColumn>
		</Container>
	);
};

export default Categories;
