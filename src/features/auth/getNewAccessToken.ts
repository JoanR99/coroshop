import axios from 'axios';

const getNewAccessToken = async () => {
	const { data } = await axios.get(
		import.meta.env.VITE_REFRESH_URL ?? '/api/refresh_token',
		{
			withCredentials: true,
		}
	);

	return data.accessToken;
};

export default getNewAccessToken;
