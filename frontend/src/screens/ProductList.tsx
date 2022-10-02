import styled from 'styled-components';

import { Container, StyledContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import ProductsTable from '../features/product/ProductsTable';

const ProductListContainer = styled(StyledContainer)`
	margin-top: 2rem;
	margin-bottom: 2rem;
`;

const ProductList = () => {
	return (
		<Container>
			<ProductListContainer>
				<Heading2>Products</Heading2>
				<ProductsTable />
			</ProductListContainer>
		</Container>
	);
};

export default ProductList;
