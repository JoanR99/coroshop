import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

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
		<Flex justify="between" align="center" gap="1">
			<SearchInput
				type="text"
				name="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				css={{ width: '9rem', height: '2.5rem', '@md': { width: '15rem' } }}
			/>
			<Button
				variant="search"
				onClick={onClickHandler}
				size="small"
				fontSize="1"
				css={{ padding: '0' }}
			>
				<FaSearch color="white" style={{ height: '1.5rem', width: '1.5rem' }} />
			</Button>
		</Flex>
	);
};

export default SearchBar;
