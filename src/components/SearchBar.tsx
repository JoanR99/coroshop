import { useState } from 'react';

import { styled } from '../../stitches.config';
import { useAppDispatch } from '../app/hooks';
import { setKeyword } from '../features/product/filterProductsSlice';
import Button from './Button';
import Flex from './Flex';
import { useLocation, useNavigate } from 'react-router-dom';

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
	const location = useLocation();
	const navigate = useNavigate();

	const onClickHandler = () => {
		dispatch(setKeyword({ keyword: search }));
		setSearch('');
		if (location.pathname === '/products') return;
		navigate('/products');
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
