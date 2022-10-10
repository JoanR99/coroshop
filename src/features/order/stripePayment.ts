import axios from 'axios';

const stripePayment = async (amount: number) => {
	const { data } = await axios.post('http://localhost:3000/api/stripe', {
		amount,
	});

	return data.clientSecret;
};

export default stripePayment;
