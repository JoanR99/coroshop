import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { Rating } from 'react-simple-star-rating';
import {
	clearFilters,
	setMaxPriceLimit,
	setMinPriceLimit,
	setMinRating,
	setPriceLimit,
} from '../features/product/filterProductsSlice';
import { StyledContainer } from './Container';
import { styled } from '../../stitches.config';
import Button from './Button';
import { Input } from './FormInput';
import { Heading3, Heading4 } from './Typography';
import Flex from './Flex';

const FilterContainer = styled(StyledContainer, {
	display: 'flex',
	flexDirection: 'column',
	width: 'fit-content',
});

const PriceInput = styled(Input, {
	maxWidth: '10rem',
	fontSize: '1.2rem',
});

function FilterCard() {
	const [minRating, setMinRatingLimit] = useState<string>('');
	const [minPrice, setMinPrice] = useState<string>('');
	const [maxPrice, setMaxPrice] = useState<string>('');
	const [hasFilterChange, setHasFilterChange] = useState(false);

	const dispatch = useAppDispatch();

	const handleMinRating = () => {
		if (minRating) {
			const rating = Number(minRating) / 20;
			dispatch(setMinRating({ minRating: rating }));
		}
		setHasFilterChange(true);
	};

	const handleFilterPrice = () => {
		if (minPrice && maxPrice && maxPrice > minPrice) {
			dispatch(
				setPriceLimit({
					minPriceLimit: Number(minPrice),
					maxPriceLimit: Number(maxPrice),
				})
			);
			setHasFilterChange(true);
		} else if (minPrice) {
			dispatch(setMinPriceLimit({ minPriceLimit: Number(minPrice) }));
			setHasFilterChange(true);
		} else if (maxPrice) {
			dispatch(setMaxPriceLimit({ maxPriceLimit: Number(maxPrice) }));
			setHasFilterChange(true);
		}
	};

	const handleReset = () => {
		setMinRatingLimit('');
		setMinPrice('');
		setMaxPrice('');
		dispatch(clearFilters());
		setHasFilterChange(false);
	};

	return (
		<FilterContainer>
			<Heading3
				size={{
					'@initial': 2,
					'@md': 3,
				}}
			>
				Filters
			</Heading3>
			<Flex direction="column" css={{ my: '1rem' }}>
				<Heading4
					size={{
						'@initial': 1,
						'@md': 2,
					}}
				>
					Rating
				</Heading4>
				<Flex align="start" gap={1}>
					<Rating
						ratingValue={Number(minRating)}
						onClick={(rating: number) => setMinRatingLimit(String(rating))}
						size={30}
					/>
					<Button
						size={{ '@initial': 'small', '@md': 'normal' }}
						fontSize={{ '@initial': 1, '@md': 2 }}
						variant="main"
						onClick={handleMinRating}
					>
						Filter
					</Button>
				</Flex>
			</Flex>

			<Flex direction="column" css={{ my: '1rem' }}>
				<Heading4
					size={{
						'@initial': 1,
						'@md': 2,
					}}
				>
					Price
				</Heading4>
				<Flex align="start" gap={1}>
					<PriceInput
						type="number"
						name="minPriceLimit"
						id="minPriceLimit"
						value={minPrice}
						onChange={(e) => setMinPrice(e.target.value)}
						placeholder="min"
						min={0}
					/>

					<PriceInput
						type="number"
						name="maxPriceLimit"
						id="maxPriceLimit"
						value={maxPrice}
						onChange={(e) => setMaxPrice(e.target.value)}
						placeholder="max"
						min={1}
					/>

					<Button
						variant="main"
						size={{ '@initial': 'small', '@md': 'normal' }}
						fontSize={{ '@initial': 1, '@md': 2 }}
						onClick={handleFilterPrice}
					>
						Filter
					</Button>
				</Flex>
			</Flex>

			{hasFilterChange && (
				<Button
					variant="main"
					size={{ '@initial': 'small', '@md': 'normal' }}
					fontSize={{ '@initial': 1, '@md': 2 }}
					onClick={handleReset}
				>
					Clear Filters
				</Button>
			)}
		</FilterContainer>
	);
}

export default FilterCard;
