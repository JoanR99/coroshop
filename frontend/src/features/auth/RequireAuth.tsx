import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { selectCurrentAccessToken } from './authSlice';

const RequireAuth = () => {
	const accessToken = useAppSelector(selectCurrentAccessToken);
	const location = useLocation();

	return accessToken ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default RequireAuth;
