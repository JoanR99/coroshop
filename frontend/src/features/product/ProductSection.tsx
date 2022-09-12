import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainButton } from '../../components/Button';
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

const ProductSection = () => {
	const navigate = useNavigate();

	const clickHandler = () => navigate('/products');

	return (
		<SectionContainer>
			<SectionImage />
			<SectionPartText>
				<Container>
					<Heading1>Here you can find the most recent tech products</Heading1>
					<Paragraph>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
						totam sequi fuga libero, voluptates numquam culpa dolorem et
						perferendis quod at quae qui vitae ab distinctio velit iure officiis
						corporis!
					</Paragraph>
					<MainButton onClick={clickHandler}>All Products</MainButton>
				</Container>
			</SectionPartText>
		</SectionContainer>
	);
};

export default ProductSection;
