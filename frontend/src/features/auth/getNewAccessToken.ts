import axios from 'axios';

const getNewAccessToken = async () => {
	const { data } = await axios.get('http://localhost:3000/api/refresh_token', {
		withCredentials: true,
	});

	return data.accessToken;
};

export default getNewAccessToken;
