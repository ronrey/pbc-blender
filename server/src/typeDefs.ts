import { gql } from 'apollo-server-express';
export const typeDefs = gql`
	scalar DateTime

	type Status {
		success: Boolean
		code: String
		message: String
	}
	input BlendItemInput {
		coffeeId: Int!
		grams: Float!
	}

	type Query {
		status: Status
	}
	type Mutation {
		stop: Status
		blend(blend: [BlendItemInput]): Status
	}
`;
export default typeDefs;
