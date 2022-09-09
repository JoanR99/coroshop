import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentAccessToken } from './authSlice';
import jwtDecode from 'jwt-decode';

const RequireAdmin = () => {
	const accessToken = useSelector(selectCurrentAccessToken);
	const decoded = accessToken
		? jwtDecode<{ isAdmin: boolean }>(accessToken)
		: undefined;
	const isAdmin = decoded?.isAdmin || false;

	return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default RequireAdmin;
