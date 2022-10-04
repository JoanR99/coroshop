import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import refreshTokenController from './refreshTokenController';
import corsOptions from './config/corsOptions';
import credentials from './middlewares/credentials';
import clientIdController from './clientIdController';
import stripeController from './stripeController';

const app = express();

app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req, res, next) => {
	res.header({ 'Access-Control-Allow-Origin': 'http://localhost:5173' });
	next();
});

app.get('/api/refresh_token', refreshTokenController);

app.get('/api/clientId', clientIdController);

app.post('/api/stripe', stripeController);

export default app;
