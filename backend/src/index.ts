import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolvers';
import { AuthResolver } from './resolvers/AuthResolvers';

import connectDB from './config/database';

const start = async () => {
	await connectDB();
	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, AuthResolver],
		}),
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app });

	app.listen(8080, () => console.log('Server started at port 8080'));
};

start();
