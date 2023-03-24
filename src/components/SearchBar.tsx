import { useState } from 'react';

import { styled } from '../../stitches.config';
import { useAppDispatch } from '../app/hooks';
import { setKeyword } from '../features/product/filterProductsSlice';
import Button from './Button';
import Flex from './Flex';

const SearchInput = styled('input', {
	fontSize: '1.5rem',
	fontFamily: 'inherit',
	padding: '0.5rem 1.6rem',
	borderRadius: '1rem',
	border: 'solid 1px $main',
	mr: '1rem',
});

const SearchBar = () => {
	const [search, setSearch] = useState('');
	const dispatch = useAppDispatch();

	const onClickHandler = () => {
		dispatch(setKeyword({ keyword: search }));
		setSearch('');
	};

	return (
		<Flex
			justify="between"
			align="center"
			css={{
				width: '24rem',
				display: 'none',
				'@md': { display: 'flex' },
			}}
		>
			<SearchInput
				type="text"
				name="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Button
				variant="search"
				onClick={onClickHandler}
				size="small"
				fontSize="1"
			>
				Search
			</Button>
		</Flex>
	);
};

export default SearchBar;
