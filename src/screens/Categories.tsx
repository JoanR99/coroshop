import styled from 'styled-components';
import { Container } from '../components/Container';
import { Heading2 } from '../components/Typography';
import CategoryStack from '../features/product/CategoryStack';

const CATEGORIES = ['Phones', 'Laptops', 'Accessories', 'TV'];

const FlexColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6rem;
`;

const MarginHeading = styled(Heading2)`
	margin: 2rem 0;
`;

const MarginContainer = styled(Container)`
	margin-bottom: 2rem;
`;

const Categories = () => {
	return (
		<MarginContainer>
			<MarginHeading>Categories</MarginHeading>
			<FlexColumn>
				{CATEGORIES.map((category) => (
					<CategoryStack category={category} />
				))}
			</FlexColumn>
		</MarginContainer>
	);
};

export default Categories;
