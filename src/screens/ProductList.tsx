import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

import { StyledContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import ProductsTable from '../features/product/ProductsTable';
import { styled } from '../../stitches.config';

const ProductListContainer = styled(StyledContainer, {
	width: '100%+',
});

const HeadingSection = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

const ProductList = () => {
	const navigate = useNavigate();

	const handleClick = () => navigate('/admin/add-product');

	return (
		<ProductListContainer>
			<HeadingSection>
				<Heading2>Products</Heading2>
				<Button variant="add" onClick={handleClick}>
					Add Product
				</Button>
			</HeadingSection>

			<ProductsTable />
		</ProductListContainer>
	);
};

export default ProductList;
