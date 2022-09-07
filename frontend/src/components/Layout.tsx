import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const Container = styled.div`
	width: 90vw;
	margin: auto;
`;

const Layout = () => (
	<>
		<Navbar />

		<Container>
			<Outlet />
		</Container>
	</>
);

export default Layout;
