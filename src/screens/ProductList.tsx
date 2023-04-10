import { StyledContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import ProductsTable from '../features/product/ProductsTable';
import { styled } from '../../stitches.config';
import EditProductModal from '../features/product/AddProductModal';

const HeadingSection = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
});

const ProductList = () => {
	return (
		<StyledContainer css={{ mb: '2rem', overflowY: 'scroll' }}>
			<HeadingSection>
				<Heading2
					size={{
						'@initial': '3',
						'@md': '4',
					}}
				>
					Products
				</Heading2>
				<EditProductModal />
			</HeadingSection>

			<ProductsTable />
		</StyledContainer>
	);
};

export default ProductList;
