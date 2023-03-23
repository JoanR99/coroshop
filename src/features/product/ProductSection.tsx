import { useNavigate } from 'react-router-dom';

import { styled } from '../../../stitches.config';
import Button from '../../components/Button';
import { Heading1, Paragraph } from '../../components/Typography';
import img from '../../assets/images/products.jpg';
import { SectionContainer, SectionPartText } from '../../components/Section';
import { Container } from '../../components/Container';

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
					rgba(255, 255, 255, 0.9)
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

const ProductSection = () => {
	const navigate = useNavigate();

	const clickHandler = () => navigate('/products');

	return (
		<SectionContainer
			flex={{
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
						Here you can find the most recent tech products
					</Heading1>
					<Text
						size={{
							'@initial': 'small',
							'@md': 'normal',
						}}
					>
						Coroshop brings you the latest products on the market with the most
						modern technology at the best prices. In addition, we also offer
						international shipping and a panel where you can see the status of
						your orders.
					</Text>
					<Button
						variant="main"
						onClick={clickHandler}
						size={{
							'@initial': 'small',
							'@md': 'normal',
						}}
					>
						All Products
					</Button>
				</Container>
			</SectionPartText>
		</SectionContainer>
	);
};

export default ProductSection;
