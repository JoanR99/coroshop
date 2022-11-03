import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Navbar from './Navbar';

const Layout = () => {
	const location = useLocation();

	return (
		<>
			<Header shadow={location.pathname.includes('admin')} />
			{!location.pathname.includes('admin') && <Navbar />}

			<Outlet />
		</>
	);
};

export default Layout;
