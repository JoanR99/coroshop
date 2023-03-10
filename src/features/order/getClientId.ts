import axios from 'axios';

const getClientSecretFromServer = async () => {
	const { data } = await axios.get('/api/clientId');

	return data.clientId;
};

export default getClientSecretFromServer;
