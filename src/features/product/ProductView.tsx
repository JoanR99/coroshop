import { useState } from 'react';
import { toast } from 'react-toastify';
import { Rating } from 'react-simple-star-rating';

import { useAppDispatch } from '../../app/hooks';
import Button from '../../components/Button';
import { FlexSection } from '../../components/Section';
import { Heading2, Heading4, Paragraph } from '../../components/Typography';
import { addToCart } from '../cart/cartSlice';
import { styled } from '../../../stitches.config';
import { ProductInfo } from './productTypes';
import { Box } from '../../components/Box';
import { StyledContainer } from '../../components/Container';

type Props = {
	product: ProductInfo;
};

export const ProductImage = styled('img', {
	width: '100%',
	maxHeight: '500px',
});

export const Detail = styled(Box, {
	my: '1rem',
});

export const QuantityBox = styled(Box, {
	display: 'inline-block',
	mr: '1rem',
});

const ProductView = ({ product }: Props) => {
	const [quantity, setQuantity] = useState(1);
	const dispatch = useAppDispatch();

	const handleQuantityChange = (e: React.FormEvent<HTMLInputElement>) => {
		if (Number(e!.currentTarget!.value) > product!.countInStock) {
			setQuantity(product!.countInStock);
		} else {
			setQuantity(Number(e!.currentTarget!.value));
		}
	};

	const handleClick = () => {
		dispatch(addToCart({ ...product!, quantity }));
		toast.success('Item added to cart', {
			hideProgressBar: true,
			autoClose: 1000,
		});
	};

	return (
		<>
			<FlexSection
				align="center"
				direction={{
					'@initial': 'column',
					'@md': 'row',
				}}
				justify={{
					'@md': 'between',
				}}
				css={{ my: '2rem', '@lg': { my: '4rem' } }}
			>
				<Box css={{ '@md': { width: '48%' } }}>
					<ProductImage src={product?.image} />
				</Box>
				<Box css={{ '@md': { width: '48%' } }}>
					<StyledContainer css={{ width: '90%', mx: 'auto', my: '2rem' }}>
						<Detail>
							<Heading2
								size={{
									'@initial': '3',
									'@md': '4',
								}}
							>
								{product?.name}
							</Heading2>
						</Detail>

						<Detail>
							<Rating
								ratingValue={0}
								initialValue={product!.rating}
								size={30}
								readonly
							/>
							<Paragraph
								fontSize={{
									'@initial': '2',
									'@md': '3',
								}}
							>
								{product?.numReviews} Reviews
							</Paragraph>
						</Detail>

						<Detail>
							<Heading4
								size={{
									'@initial': '1',
									'@md': '2',
								}}
							>
								Price:
							</Heading4>
							<Paragraph
								fontSize={{
									'@initial': '2',
									'@md': '3',
								}}
							>
								${product?.price}
							</Paragraph>
						</Detail>

						<Detail>
							<Heading4
								size={{
									'@initial': '1',
									'@md': '2',
								}}
							>
								Description:
							</Heading4>
							<Paragraph
								fontSize={{
									'@initial': '2',
									'@md': '3',
								}}
							>
								{product?.description}
							</Paragraph>
						</Detail>

						<Detail>
							<Heading4
								size={{
									'@initial': '1',
									'@md': '2',
								}}
							>
								Status:
							</Heading4>
							<Paragraph
								fontSize={{
									'@initial': '2',
									'@md': '3',
								}}
							>
								{product!.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
							</Paragraph>
						</Detail>

						{product!.countInStock > 0 && (
							<QuantityBox>
								<label htmlFor="quantity">
									<Heading4
										size={{
											'@initial': '1',
											'@md': '2',
										}}
										css={{ mb: '1rem' }}
									>
										Quantity
									</Heading4>
								</label>
								<input
									type="number"
									id="quantity"
									min="1"
									max={product!.countInStock}
									value={quantity}
									onChange={handleQuantityChange}
								/>
							</QuantityBox>
						)}
						<Button
							variant="main"
							onClick={handleClick}
							size={{
								'@initial': 'small',
								'@lg': 'normal',
							}}
							fontSize={{
								'@initial': '1',
								'@lg': '2',
							}}
						>
							ADD TO CART
						</Button>
					</StyledContainer>
				</Box>
			</FlexSection>
		</>
	);
};

export default ProductView;
