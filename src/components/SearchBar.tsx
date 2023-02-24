import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '../../stitches.config';
import Button from './Button';

const SearchContainer = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '24rem',
});

const SearchInput = styled('input', {
	fontSize: '1.5rem',
	fontFamily: 'inherit',
	padding: '0.5rem 1.6rem',
	borderRadius: '1rem',
	border: 'solid 1px $main',
	mr: '1rem',
});

const SearchBar = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');

	const onClickHandler = () => {
		const searchAddress =
			search === '' ? '/products' : `/products/search/${search}`;
		navigate(searchAddress);
		setSearch('');
	};

	return (
		<SearchContainer>
			<SearchInput
				type="text"
				name="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Button variant="search" onClick={onClickHandler}>
				Search
			</Button>
		</SearchContainer>
	);
};

export default SearchBar;
