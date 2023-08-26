"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
	scalar DateTime
	type Weight {
		adjusted: Float
		raw: Float
	}
	type Status {
		success: Boolean
		code: String
		message: String
	}
	input blendInput {
		coffeeId: Int!
		moduleId: Int!
		weight: Float!
	}
	type Query {
		status: Status
	}
	type Mutation {
		stop: Status
		blend(coffees: [blendInput!]!): Status
	}
`;
exports.default = exports.typeDefs;
