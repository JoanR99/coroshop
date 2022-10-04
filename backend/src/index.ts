import 'reflect-metadata';
import { Express } from 'express-serve-static-core';

import db from './config/database';

import app from './app';
import server from './config/apolloServer';

export const start = async (app: Express) => {
	await db.connect();

	const apolloServer = await server();

	await apolloServer.start();

	apolloServer.applyMiddleware({ app, path: '/api/graphql', cors: false });

	app.listen(8080, () => console.log('Server started at port 8080'));
};

start(app);
