import { useState } from 'react';
import { toast } from 'react-toastify';
import { Rating } from 'react-simple-star-rating';

import { useAppDispatch } from '../../../app/hooks';
import Button from '../../../components/Button';
import { SectionPartText } from '../../../components/Section';
import { Heading2, Heading4, Paragraph } from '../../../components/Typography';
import { addToCart } from '../../cart/cartSlice';
import { useGetProductQuery } from '../productApiSlice';
import {
	Detail,
	ProductDetails,
	ProductImage,
	ProductViewContainer,
	QuantityBox,
} from './ProductViewStyles';
import { styled } from '../../../../stitches.config';
import { ProductInfo, ProductOverview } from '../productTypes';

const SectionPartImage = styled('div', {
	width: '48%',
	height: 'auto',
});

type Props = {
	product: ProductInfo;
};

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
			<ProductViewContainer>
				<SectionPartImage>
					<ProductImage src={product?.image} />
				</SectionPartImage>
				<SectionPartText>
					<ProductDetails>
						<Detail>
							<Heading2>{product?.name}</Heading2>
						</Detail>

						<Detail>
							<Rating
								ratingValue={0}
								initialValue={product!.rating}
								size={30}
								readonly
							/>
							<Paragraph>{product?.numReviews} Reviews</Paragraph>
						</Detail>

						<Detail>
							<Heading4>Price:</Heading4>
							<Paragraph>${product?.price}</Paragraph>
						</Detail>

						<Detail>
							<Heading4>Description:</Heading4>
							<Paragraph>{product?.description}</Paragraph>
						</Detail>

						<Detail>
							<Heading4>Status:</Heading4>
							<Paragraph>
								{product!.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
							</Paragraph>
						</Detail>

						{product!.countInStock > 0 && (
							<QuantityBox>
								<label htmlFor="quantity">
									<Heading4>Quantity</Heading4>
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
						<Button variant="main" onClick={handleClick}>
							ADD TO CART
						</Button>
					</ProductDetails>
				</SectionPartText>
			</ProductViewContainer>
		</>
	);
};

export default ProductView;
