import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { selectCurrentAccessToken } from './authSlice';

const RequireAuth = () => {
	const accessToken = selectCurrentAccessToken();
	const location = useLocation();

	return accessToken ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default RequireAuth;
