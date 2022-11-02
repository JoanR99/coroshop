import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';

const Layout = () => {
	const location = useLocation();

	return (
		<>
			<Header />
			{!location.pathname.includes('admin') ? <Navbar /> : <AdminNavbar />}

			<Outlet />
		</>
	);
};

export default Layout;
