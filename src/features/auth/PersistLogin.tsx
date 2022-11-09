import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentAccessToken, setCredentials } from './authSlice';
import getNewAccessToken from './getNewAccessToken';
import { setIsAdmin } from './authSlice';
import Spinner from '../../components/Spinner';

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useAppDispatch();
	const accessToken = useAppSelector(selectCurrentAccessToken);
	const item: string | null = localStorage.getItem('persist');
	const persist = item ? JSON.parse(item) : false;

	const decoded = accessToken
		? jwtDecode<{ isAdmin: boolean }>(accessToken)
		: undefined;

	const isAdmin = decoded?.isAdmin || false;

	useEffect(() => {
		dispatch(setIsAdmin({ isAdmin }));
	}, [accessToken]);

	useEffect(() => {
		let isMounted = true;
		const verifyRefreshToken = async () => {
			try {
				const newAccessToken = await getNewAccessToken();

				dispatch(setCredentials({ accessToken: newAccessToken }));
			} catch (e) {
				console.log(e);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		!accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

		return () => {
			isMounted = false;
		};
	}, []);

	return isLoading ? <Spinner /> : <Outlet />;
};

export default PersistLogin;
