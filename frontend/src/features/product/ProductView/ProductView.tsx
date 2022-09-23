import { useState } from 'react';
import { toast } from 'react-toastify';
import { Rating } from 'react-simple-star-rating';
import { useAppDispatch } from '../../../app/hooks';
import { MainButton } from '../../../components/Button';
import { SectionPartImage, SectionPartText } from '../../../components/Section';
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

type Props = {
	productId: string;
};

const ProductView = ({ productId }: Props) => {
	const { isLoading, isError, data } = useGetProductQuery({ productId });
	const [quantity, setQuantity] = useState(1);
	const dispatch = useAppDispatch();

	const product = data?.getProduct;

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

	return isLoading ? (
		<div>Loading...</div>
	) : isError ? (
		<div>Error</div>
	) : (
		<ProductViewContainer>
			<SectionPartImage>
				<ProductImage src={product?.image} width="500px" />
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
					<MainButton onClick={handleClick}>ADD TO CART</MainButton>
				</ProductDetails>
			</SectionPartText>
		</ProductViewContainer>
	);
};

export default ProductView;
