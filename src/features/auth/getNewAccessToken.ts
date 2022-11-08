import axios from 'axios';

const getNewAccessToken = async () => {
	const { data } = await axios.get(
		'https://coroshop-server.onrender.com/api/refresh_token',
		{
			withCredentials: true,
		}
	);

	return data.accessToken;
};

export default getNewAccessToken;
