import { StyledContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import ProductsTable from '../features/product/ProductsTable';
import { styled } from '../../stitches.config';
import EditProductModal from '../features/product/AddProductModal';

const ProductListContainer = styled(StyledContainer, {
	width: '100%+',
});

const HeadingSection = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

const ProductList = () => {
	return (
		<ProductListContainer>
			<HeadingSection>
				<Heading2>Products</Heading2>
				<EditProductModal />
			</HeadingSection>

			<ProductsTable />
		</ProductListContainer>
	);
};

export default ProductList;
