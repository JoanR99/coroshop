import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { selectCurrentAccessToken, setCredentials } from './authSlice';
import getNewAccessToken from './getNewAccessToken';

const PersistLogin = () => {
	const dispatch = useDispatch();
	const accessToken = useSelector(selectCurrentAccessToken);
	const item: string | null = localStorage.getItem('persist');
	const persist = item ? JSON.parse(item) : false;
	const [isLoading, setIsLoading] = useState(true);

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

	return isLoading ? <div>Loading...</div> : <Outlet />;
};

export default PersistLogin;
