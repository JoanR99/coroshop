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

	variants: {
		width: {
			half: {
				width: '48%',
			},
			full: {
				width: '100%',
			},
		},
		height: {
			full: {
				height: '58rem',
			},
			small: {
				height: '15rem',
			},
		},
		backgroundImage: {
			left: {
				backgroundImage: `linear-gradient(
					to left,
					rgba(102, 212, 82, 0),
					rgba(33, 175, 128, 0),
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
			},
			bottom: {
				backgroundImage: `linear-gradient(
					to bottom,
					rgba(102, 212, 82, 0),
					rgba(33, 175, 128, 0),
					rgba(33, 175, 128, 0),
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
			},
		},
	},
});

const Text = styled(Paragraph, {
	mb: '2rem',

	variants: {
		size: {
			small: {
				fontSize: '1.2rem',
			},
			normal: {
				fontSize: '1.6rem',
			},
		},
	},
});

const CategoriesSection = () => {
	const navigate = useNavigate();

	const clickHandler = () => navigate('/categories');

	return (
		<Section
			flex={{
				'@initial': 'column-reverse',
				'@md': 'row',
			}}
		>
			<SectionPartText
				width={{
					'@initial': 'full',
					'@md': 'half',
				}}
			>
				<Container>
					<Heading1
						size={{
							'@initial': 'small',
							'@md': 'normal',
						}}
					>
						We got you cover
					</Heading1>
					<Text
						size={{
							'@initial': 'small',
							'@md': 'normal',
						}}
					>
						Search through the different categories to find the ideal device.
						Here you can find the latest trends in smartphones, laptops, TV and
						accessories.
					</Text>
					<Button
						variant="main"
						onClick={clickHandler}
						size={{
							'@initial': 'small',
							'@md': 'normal',
						}}
					>
						Categories
					</Button>
				</Container>
			</SectionPartText>
			<SectionImage
				width={{
					'@initial': 'full',
					'@md': 'half',
				}}
				height={{
					'@initial': 'small',
					'@md': 'full',
				}}
				backgroundImage={{
					'@initial': 'bottom',
					'@md': 'left',
				}}
			/>
		</Section>
	);
};

export default CategoriesSection;
