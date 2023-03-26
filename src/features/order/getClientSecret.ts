import axios from 'axios';

const serverURL = import.meta.env.VITE_SERVER_URL
	? import.meta.env.VITE_SERVER_URL + '/api/stripe'
	: '/api/stripe';

const getClientSecretFromServer = async (amount: number) => {
	const { data } = await axios.post(serverURL, {
		amount,
	});

	return data.clientSecret;
};

export default getClientSecretFromServer;
