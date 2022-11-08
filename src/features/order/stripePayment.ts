import axios from 'axios';

const stripePayment = async (amount: number) => {
	const { data } = await axios.post(
		'https://coroshop-server.onrender.com/api/stripe',
		{
			amount,
		}
	);

	return data.clientSecret;
};

export default stripePayment;
