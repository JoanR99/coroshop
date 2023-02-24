import { useNavigate } from 'react-router-dom';
import { styled } from '../../../stitches.config';

import Button from '../../components/Button';
import { Heading1, Paragraph } from '../../components/Typography';
import img from '../../assets/images/iphone.jpg';
import { SectionContainer, SectionPartText } from '../../components/Section';
import { Container } from '../../components/Container';

const Section = styled(SectionContainer, {
	backgroundColor: '$main_light',
});

export const SectionImage = styled('div', {
	width: '48%',
	height: '100%',
	backgroundImage: `linear-gradient(
		to right,
		rgba(102, 212, 82, 0),
		rgba(33, 175, 128, 0),
		rgba(33, 175, 128, 0),
		rgba(33, 175, 128, 0),
		rgba(33, 175, 128, 0),
		rgba(33, 175, 128, 0),
		rgba(168, 218, 220, 0.9),
		rgba(168, 218, 220, 1)
	),
	url(${img})`,
	backgroundSize: 'cover',
});

const Text = styled(Paragraph, {
	mb: '2rem',
});

const CategoriesSection = () => {
	const navigate = useNavigate();

	const clickHandler = () => navigate('/categories');

	return (
		<Section>
			<SectionPartText>
				<Container>
					<Heading1>We got you cover</Heading1>
					<Text>
						Search through the different categories to find the ideal device.
						Here you can find the latest trends in smartphones, laptops, TV and
						accessories.
					</Text>
					<Button variant="main" onClick={clickHandler}>
						Categories
					</Button>
				</Container>
			</SectionPartText>
			<SectionImage />
		</Section>
	);
};

export default CategoriesSection;
