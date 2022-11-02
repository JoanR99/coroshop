import styled from 'styled-components';

import { StyledContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import ProductsTable from '../features/product/ProductsTable';

const ProductListContainer = styled(StyledContainer)`
	width: 100%;
`;

const ProductList = () => {
	return (
		<ProductListContainer>
			<Heading2>Products</Heading2>
			<ProductsTable />
		</ProductListContainer>
	);
};

export default ProductList;
