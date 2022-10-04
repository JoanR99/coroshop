import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { UserResolver } from '../resolvers/UserResolvers';
import { AuthResolver } from '../resolvers/AuthResolvers';
import { ProductResolver } from '../resolvers/ProductResolvers';
import { ReviewResolver } from '../resolvers/ReviewResolvers';
import { OrderResolver } from '../resolvers/OrderResolvers';

const server = async () => {
	return new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				UserResolver,
				AuthResolver,
				ProductResolver,
				ReviewResolver,
				OrderResolver,
			],
		}),
		context: ({ req, res }) => ({ req, res }),
	});
};

export default server;
