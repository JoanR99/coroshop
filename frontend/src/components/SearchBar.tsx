import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SearchButton } from './Button';

const SearchContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 24rem;
`;

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
			<input
				type="text"
				name="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<SearchButton onClick={onClickHandler}>Search</SearchButton>
		</SearchContainer>
	);
};

export default SearchBar;
