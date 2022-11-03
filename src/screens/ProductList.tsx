import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainButton } from '../components/Button';

import { StyledContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import ProductsTable from '../features/product/ProductsTable';

const ProductListContainer = styled(StyledContainer)`
	width: 100%;
`;

const HeadingSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ProductList = () => {
	const navigate = useNavigate();

	const handleClick = () => navigate('/admin/add-product');

	return (
		<ProductListContainer>
			<HeadingSection>
				<Heading2>Products</Heading2>
				<MainButton onClick={handleClick}>Add Product</MainButton>
			</HeadingSection>

			<ProductsTable />
		</ProductListContainer>
	);
};

export default ProductList;
