import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { selectIsAdmin } from './authSlice';

const RequireAdmin = () => {
	const isAdmin = useAppSelector(selectIsAdmin);

	return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default RequireAdmin;
