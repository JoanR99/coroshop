import axios from 'axios';

const stripePayment = async (amount: number) => {
	const { data } = await axios.post('http://localhost:8080/api/stripe', {
		amount,
	});

	return data.clientSecret;
};

export default stripePayment;
