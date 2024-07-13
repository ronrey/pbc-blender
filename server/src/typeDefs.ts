import { gql } from 'apollo-server-express';
export const typeDefs = gql`
	scalar DateTime
	type Status {
		success: Boolean
		code: String
		message: String
	}
	type Reading {
		grams: Float
		index: Int
		nodeId: Int
	}
	input BlendItemInput {
		coffeeId: Int!
		grams: Float!
	}
	type CoffeeModule {
		coffeeId: Int!
		moduleId: Int!
		stationId: Int!
		state: String!
	}
	input CoffeeModuleInput {
		coffeeId: Int!
		moduleId: Int!
		stationId: Int!
		state: String!
	}
	type Coffee {
		_id: ID
		state: String
		key: Int
		decaf: Boolean
		prices: [Price]
		mouthfeel: Float
		acidity: Float
		caramel: Float
		fruit: Float
		flower: Float
		flavors: [String!]
		qualities: [String!]
		region: String
		roast: String
		paragraphs: [String!]
	}
	type Price {
		measurement: String
		quantity: Int
		price: Float
	}
	type Query {
		status: Status
		getServerName(index: Int): String
		getScaleReading(index: Int, nodeId: Int): Float
		getScaleGrams(index: Int, nodeId: Int): Float
		getSiloReading(index: Int, nodeId: Int): Float
		getSiloGrams(index: Int, nodeId: Int): Reading
		getScaleBaseline(index: Int, nodeId: Int): Float
		getSiloBaseline(index: Int, nodeId: Int): Float
		getCoffeeMap: [CoffeeModule!]!
		getCoffeeByKey(key: Int): Coffee
		getCoffees: [Coffee!]!
	}
	type Mutation {
		stop: Status
		stopModule(index: Int): Status
		blend(orderId: ID, itemId: Int, blend: [BlendItemInput]): Status
		stopFeed(index: Int, nodeId: Int): Status
		startFeed(index: Int, nodeId: Int): Status
		feed(index: Int, nodeId: Int, grams: Float): Status
		tareScale(index: Int, nodeId: Int): Status
		tareSilo(index: Int, nodeId: Int): Status
		openGate(index: Int, nodeId: Int): Status
		closeGate(index: Int, nodeId: Int): Status
		cycleGate(index: Int, nodeId: Int): Status
		setCoffeeMap(coffeeModules: [CoffeeModuleInput!]!): Status
		cycleMixer(duration: Float): Status
		onMixer: Status
		offMixer: Status
	}
`;
export default typeDefs;
