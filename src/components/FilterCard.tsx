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
import { Heading2, Heading3, Heading4 } from './Typography';

const FilterContainer = styled(StyledContainer, {
	display: 'flex',
	flexDirection: 'column',
	width: 'fit-content',
});

const InputGroup = styled('div', {
	display: 'flex',
	alignItems: 'start',
	gap: '1rem',
});

const InputSection = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	my: '1rem',
});

const PriceInput = styled(Input, {
	maxWidth: '10rem',
	fontSize: '1.2rem',
});

const FilterButton = styled(Button, {
	fontSize: '1.2rem',
	padding: '0.8rem 1.2rem',
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
			<Heading3>Filters</Heading3>
			<InputSection>
				<Heading4>Rating</Heading4>
				<InputGroup>
					<Rating
						ratingValue={Number(minRating)}
						onClick={(rating: number) => setMinRatingLimit(String(rating))}
						size={30}
					/>
					<FilterButton variant="main" onClick={handleMinRating}>
						Filter
					</FilterButton>
				</InputGroup>
			</InputSection>

			<InputSection>
				<Heading4>Price</Heading4>
				<InputGroup>
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

					<FilterButton variant="main" onClick={handleFilterPrice}>
						Filter
					</FilterButton>
				</InputGroup>
			</InputSection>

			{hasFilterChange && (
				<Button variant="main" onClick={handleReset}>
					Clear Filters
				</Button>
			)}
		</FilterContainer>
	);
}

export default FilterCard;
