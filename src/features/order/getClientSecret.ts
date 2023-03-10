import axios from 'axios';

const getClientSecretFromServer = async (amount: number) => {
	const { data } = await axios.post('/api/stripe', {
		amount,
	});

	return data.clientSecret;
};

export default getClientSecretFromServer;
