import { useNavigate } from 'react-router-dom';
import { styled } from '../../../stitches.config';

import Button from '../../components/Button';
import { Heading1, Paragraph } from '../../components/Typography';
import img from '../../assets/images/iphone.jpg';
import { Container } from '../../components/Container';
import { FlexSection } from '../../components/Section';
import { Box } from '../../components/Box';

export const SectionImage = styled('div', {
	width: '48%',

	variants: {
		width: {
			half: {
				width: '50%',
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

const CategoriesSection = () => {
	const navigate = useNavigate();

	const clickHandler = () => navigate('/categories');

	return (
		<FlexSection
			css={{ backgroundColor: '$main_light' }}
			direction={{
				'@initial': 'columnReverse',
				'@md': 'row',
			}}
		>
			<Box css={{ width: '80%', '@md': { width: '50%' } }}>
				<Container
					css={{
						my: '2rem',
						'@md': {
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'start',
							my: '0',
						},
					}}
				>
					<Heading1
						css={{ mb: '2rem' }}
						size={{
							'@initial': 4,
							'@md': 5,
						}}
					>
						We got you cover
					</Heading1>
					<Paragraph
						fontSize={{
							'@initial': 2,
							'@md': 3,
						}}
						css={{ mb: '2rem' }}
					>
						Search through the different categories to find the ideal device.
						Here you can find the latest trends in smartphones, laptops, TV and
						accessories.
					</Paragraph>
					<Button
						variant="main"
						onClick={clickHandler}
						size={{
							'@initial': 'small',
							'@md': 'normal',
						}}
						fontSize="1"
					>
						Categories
					</Button>
				</Container>
			</Box>
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
		</FlexSection>
	);
};

export default CategoriesSection;
