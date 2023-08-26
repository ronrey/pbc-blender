import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

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
	try {
	} catch (error) {
		console.log(`			
		      Mongo DB Host not found!
		      please add DB_HOST environment variable to .env file
		
		      exiting...			   
		    `);
	}
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

	const PORT = 4101;
	await new Promise(resolve => {
		console.log('listen');
		httpServer.listen({ port: PORT }, () => {
			console.log(`🙀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
		});
	});
}

startApolloServer();
