import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import logger from './winston';

import express from 'express';
import http from 'http';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
dotenv.config();

export interface ContextValue {
	id?: string;
}
const context = async () => {
	// const context = async ({ req, res }) => {
	//   console.log(req,res)
	// Get the user token from the headers.

	return { id: 'TEST' };
};

async function startApolloServer() {
	const app = express();
	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: context,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});
	await server.start();
	server.applyMiddleware({
		app,
		path: '/',
	});

	const port = process.env.PORT || 4000;
	await new Promise(resolve => {
		console.log('listen');
		httpServer.listen({ port }, () => {
			logger.info(`🏴‍☠️ Server ready at http://localhost:${port}${server.graphqlPath}`);
		});
	});
}

startApolloServer();
