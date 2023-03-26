import axios from 'axios';

const serverURL = import.meta.env.VITE_SERVER_URL
	? import.meta.env.VITE_SERVER_URL + '/api/clientId'
	: '/api/clientId';

const getClientSecretFromServer = async () => {
	const { data } = await axios.get(serverURL);

	return data.clientId;
};

export default getClientSecretFromServer;
