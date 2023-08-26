"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const context = () => __awaiter(void 0, void 0, void 0, function* () {
    // const context = async ({ req, res }) => {
    //   console.log(req,res)
    // Get the user token from the headers.
    return { id: 'TEST' };
});
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        try {
        }
        catch (error) {
            console.log(`			
		      Mongo DB Host not found!
		      please add DB_HOST environment variable to .env file
		
		      exiting...			   
		    `);
        }
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDefs_1.default,
            resolvers: resolvers_1.default,
            context: context,
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
        yield server.start();
        server.applyMiddleware({
            app,
            path: '/',
        });
        const PORT = 4101;
        yield new Promise(resolve => {
            console.log('listen');
            httpServer.listen({ port: PORT }, () => {
                console.log(`🙀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
            });
        });
    });
}
startApolloServer();
