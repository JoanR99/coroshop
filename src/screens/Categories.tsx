import { Container } from '../components/Container';
import { Heading2 } from '../components/Typography';
import CategoryStack from '../features/product/CategoryStack';
import { styled } from '../../stitches.config';

const CATEGORIES = ['Phones', 'Laptops', 'Accessories', 'TV'];

const FlexColumn = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '6rem',
});

const MarginHeading = styled(Heading2, {
	margin: '2rem 0',
});

const Categories = () => {
	return (
		<Container space="bottom">
			<MarginHeading>Categories</MarginHeading>
			<FlexColumn>
				{CATEGORIES.map((category) => (
					<CategoryStack category={category} key={category} />
				))}
			</FlexColumn>
		</Container>
	);
};

export default Categories;
