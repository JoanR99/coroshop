import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../components/Button';
import { Heading1, Paragraph } from '../../components/Typography';
import img from '../../assets/images/products.jpg';
import {
	SectionContainer,
	SectionPartText,
	SectionPartImage,
} from '../../components/Section';
import { Container } from '../../components/Container';

const SectionImage = styled(SectionPartImage)`
	background-image: linear-gradient(
			to right,
			rgba(102, 212, 82, 0),
			rgba(33, 175, 128, 0),
			rgba(33, 175, 128, 0),
			rgba(33, 175, 128, 0),
			rgba(33, 175, 128, 0),
			rgba(299, 299, 299, 0.6),
			rgba(299, 299, 299, 0.9)
		),
		url(${img});
	background-size: cover;
`;

const Text = styled(Paragraph)`
	margin-bottom: 2rem;
`;

const ProductSection = () => {
	const navigate = useNavigate();

	const clickHandler = () => navigate('/products');

	return (
		<SectionContainer>
			<SectionImage />
			<SectionPartText>
				<Container>
					<Heading1>Here you can find the most recent tech products</Heading1>
					<Text>
						Coroshop brings you the latest products on the market with the most
						modern technology at the best prices. In addition, we also offer
						international shipping and a panel where you can see the status of
						your orders.
					</Text>
					<Button variant="main" onClick={clickHandler}>
						All Products
					</Button>
				</Container>
			</SectionPartText>
		</SectionContainer>
	);
};

export default ProductSection;
