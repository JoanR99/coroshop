import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAdmin } from './authSlice';

const RequireAdmin = () => {
	const isAdmin = selectIsAdmin();

	return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default RequireAdmin;
