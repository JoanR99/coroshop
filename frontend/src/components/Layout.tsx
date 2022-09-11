import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Navbar from './Navbar';

const Container = styled.div`
	width: 90vw;
	margin: auto;
`;

const Layout = () => {
	return (
		<>
			<Header />
			<Navbar />

			<Container>
				<Outlet />
			</Container>
		</>
	);
};

export default Layout;
