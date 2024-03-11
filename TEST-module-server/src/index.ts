import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import Node, { NodeInterface } from './node';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from './winston';
import { SERVER_NAME } from './constants/apollo';
const RESOURCE_DIR = 'client';
import dotenv from 'dotenv';
// @ts-ignore
global.__basedir = __dirname;
dotenv.config();
export const node: NodeInterface = new Node();
const context = async () => {
  return { id: 'TEST' };
};
async function startApolloServer() {
  logger.info(process.env.SERVER_NAME);
  node.init();
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(express.static(path.join(__dirname, RESOURCE_DIR)));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); // To parse the incoming requests with JSON payloads
  app.use(cookieParser());
  server.applyMiddleware({
    app,
    path: '/graphql',
  });
  // If the request is not processed by now, it must be a request that we don't handle.
  // We redirect it to the home page.
  app.use((req, res) => {
    logger.info(`redirect`);
    res.redirect('/');
  });

  const PORT = process.env.PORT || 4000;
  await new Promise((resolve) => {
    logger.info('listen');
    httpServer.listen({ port: PORT }, () => {
      logger.info(
        `🚀 Server ${process.env.SERVER_NAME} v1.0 ready at http://localhost:${PORT}`
      );
    });
  });
}
startApolloServer();
