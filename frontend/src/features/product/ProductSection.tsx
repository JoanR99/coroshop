import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainButton } from '../../components/Button';
import { Heading1, Paragraph } from '../../components/Typography';

const SectionContainer = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 70vh;
`;

const SectionPartImage = styled.div`
	width: 48%;
`;

const SectionPartText = styled.div`
	width: 48%;
`;

const SectionImage = styled.img`
	width: 100%;
`;

const ProductSection = () => {
	const navigate = useNavigate();

	const clickHandler = () => navigate('/products');

	return (
		<SectionContainer>
			<SectionPartImage>
				<SectionImage src="/images/iphone.jpg" alt="iphone" />
			</SectionPartImage>
			<SectionPartText>
				<Heading1>Here you can find the most recent tech products</Heading1>
				<Paragraph>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, totam
					sequi fuga libero, voluptates numquam culpa dolorem et perferendis
					quod at quae qui vitae ab distinctio velit iure officiis corporis!
				</Paragraph>
				<MainButton onClick={clickHandler}>All Products</MainButton>
			</SectionPartText>
		</SectionContainer>
	);
};

export default ProductSection;
