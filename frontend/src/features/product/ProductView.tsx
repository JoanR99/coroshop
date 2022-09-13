import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { MainButton } from '../../components/Button';
import {
	SectionContainer,
	SectionPartImage,
	SectionPartText,
} from '../../components/Section';
import { Heading2, Heading4, Paragraph } from '../../components/Typography';
import { addToCart } from '../cart/cartSlice';
import { useGetProductQuery } from './productApiSlice';

type Props = {
	productId: string;
};

const Section = styled(SectionContainer)`
	margin-top: 4rem;
	align-items: flex-start;
`;

const ProductImage = styled.img`
	width: 100%;
`;

const ProductDetails = styled.div`
	width: 90%;
	margin: auto;
	margin-top: 4rem;
	margin-bottom: 4rem;
	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

const Detail = styled.div`
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const QuantityBox = styled.div`
	display: inline-block;
	margin-right: 1rem;
`;

const ProductView = ({ productId }: Props) => {
	const { isLoading, isError, data } = useGetProductQuery({ productId });
	const [quantity, setQuantity] = useState(1);
	const navigate = useNavigate();
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
		// navigate('/cart');
	};

	return isLoading ? (
		<div>Loading...</div>
	) : isError ? (
		<div>Error</div>
	) : (
		<Section>
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
		</Section>
	);
};

export default ProductView;
