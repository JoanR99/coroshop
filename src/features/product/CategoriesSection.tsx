import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { MainButton } from '../../components/Button';
import { Heading1, Paragraph } from '../../components/Typography';
import img from '../../assets/images/iphone.jpg';
import {
	SectionContainer,
	SectionPartImage,
	SectionPartText,
} from '../../components/Section';
import { Container } from '../../components/Container';

const Section = styled(SectionContainer)`
	background-color: #a8dadc;
`;

const SectionImage = styled(SectionPartImage)`
	background-image: linear-gradient(
			to left,
			rgba(102, 212, 82, 0),
			rgba(33, 175, 128, 0),
			rgba(33, 175, 128, 0),
			rgba(168, 218, 220, 0.9)
		),
		url(${img});
	background-size: cover;
`;

const Text = styled(Paragraph)`
	margin-bottom: 2rem;
`;

const CategoriesSection = () => {
	const navigate = useNavigate();

	const clickHandler = () => navigate('/products');

	return (
		<Section>
			<SectionPartText>
				<Container>
					<Heading1>Here you can find the most recent tech products</Heading1>
					<Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
						totam sequi fuga libero, voluptates numquam culpa dolorem et
						perferendis quod at quae qui vitae ab distinctio velit iure officiis
						corporis!
					</Text>
					<MainButton onClick={clickHandler}>All Products</MainButton>
				</Container>
			</SectionPartText>
			<SectionImage />
		</Section>
	);
};

export default CategoriesSection;
