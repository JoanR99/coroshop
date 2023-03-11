import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentAccessToken, setCredentials } from './authSlice';
import getNewAccessToken from './getNewAccessToken';
import Spinner from '../../components/Spinner';

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useAppDispatch();
	const accessToken = useAppSelector(selectCurrentAccessToken);
	const item: string | null = localStorage.getItem('persist');
	const persist = item ? JSON.parse(item) : false;

	useEffect(() => {
		let isMounted = true;
		const verifyRefreshToken = async () => {
			try {
				const newAccessToken = await getNewAccessToken();

				isMounted && dispatch(setCredentials({ accessToken: newAccessToken }));
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
