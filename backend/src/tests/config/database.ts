import mongoose from 'mongoose';
import env from 'dotenv';
env.config();

let connection: typeof mongoose;

const connectionUri = process.env.MONGO_URI_TEST as string;

const connect = async () => {
	try {
		connection = await mongoose.connect(connectionUri, {});

		console.log(`MongoDB Connected: ${connection.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error}`);
		process.exit(1);
	}
};

const close = async () => await connection.connection.close();

const clear = async () => {
	const collections = connection.connection.collections;
	for (const key in collections) {
		await collections[key].deleteMany({});
	}
};

export default { connect, close, clear };
