import { useNavigate } from 'react-router-dom';

import { styled } from '../../../stitches.config';
import Button from '../../components/Button';
import { Heading1, Paragraph } from '../../components/Typography';
import img from '../../assets/images/products.jpg';
import { FlexSection } from '../../components/Section';
import { Container } from '../../components/Container';
import { Box } from '../../components/Box';

export const SectionImage = styled('div', {
	width: '50%',

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
			right: {
				backgroundImage: `linear-gradient(
					to right,
					rgba(102, 212, 82, 0),
					rgba(33, 175, 128, 0),
					rgba(33, 175, 128, 0),
					rgba(33, 175, 128, 0),
					rgba(33, 175, 128, 0),
					rgba(255, 255, 255, 0.9)
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
					rgba(255, 255, 255, 0.9),
					rgba(255, 255, 255, 1)
				),
				url(${img})`,
				backgroundSize: 'cover',
			},
		},
	},
});

const ProductSection = () => {
	const navigate = useNavigate();

	const clickHandler = () => navigate('/products');

	return (
		<FlexSection
			direction={{
				'@initial': 'column',
				'@md': 'row',
			}}
		>
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
					'@md': 'right',
				}}
			/>
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
						Here you can find the most recent tech products
					</Heading1>
					<Paragraph
						fontSize={{
							'@initial': 2,
							'@md': 3,
						}}
						css={{ mb: '2rem' }}
					>
						Coroshop brings you the latest products on the market with the most
						modern technology at the best prices. In addition, we also offer
						international shipping and a panel where you can see the status of
						your orders.
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
						All Products
					</Button>
				</Container>
			</Box>
		</FlexSection>
	);
};

export default ProductSection;
