import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { UserResolver } from './resolvers/UserResolvers';
import { AuthResolver } from './resolvers/AuthResolvers';
import { ProductResolver } from './resolvers/ProductResolvers';
import { ReviewResolver } from './resolvers/ReviewResolvers';

import connectDB from './config/database';
import refreshTokenController from './refreshTokenController';
import corsOptions from './config/corsOptions';
import credentials from './middlewares/credentials';

const start = async () => {
	await connectDB();
	const app = express();

	app.use(credentials);
	app.use(cors(corsOptions));
	app.use(cookieParser());

	app.use((req, res, next) => {
		res.header({ 'Access-Control-Allow-Origin': 'http://localhost:5173' });
		next();
	});

	app.get('/api/refresh_token', refreshTokenController);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, AuthResolver, ProductResolver, ReviewResolver],
		}),
		context: ({ req, res }) => ({ req, res }),
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app, path: '/api/graphql', cors: false });

	app.listen(8080, () => console.log('Server started at port 8080'));
};

start();
