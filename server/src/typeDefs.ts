import { gql } from 'apollo-server-express';
export const typeDefs = gql`
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
		nodeId: Int!
		grams: Float!
	}

	type Query {
		status: Status
	}
	type Mutation {
		stop: Status
		blend(blend: [blendInput]): Status
	}
`;
export default typeDefs;
