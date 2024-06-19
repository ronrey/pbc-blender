import { request, gql } from 'graphql-request';
import { Status } from '../types';
import { moduleUrls } from '../blender/settings';
import { Coffee } from '../types';
import logger from '../winston';
const GET_COFFEE_BY_KEY = gql`
	query GetCoffeeByKey($key: Int) {
		getCoffeeByKey(key: $key) {
			key
			state
			region
			roast
			decaf
		}
	}
`;

export interface ProductionInterface {
	getCoffeeByKey(key: number): Coffee;
}
export type StationId = [number, number];
export class Production {
	endpoint: string;
	constructor() {
		const url = 'http://192.168.0.49:1777/graphql';
		this.endpoint = url;
	}

	getCoffeeByKey = async (key: number) => {
		debugger;
		const variables = {
			key: key,
		};
		const coffee: { getCoffeeByKey: Coffee } = await request(this.endpoint, GET_COFFEE_BY_KEY, variables);
		return coffee.getCoffeeByKey;
	};
	getCoffees = async () => {
		const query = gql`
			query GetCoffees {
				getCoffees {
					key
					state
					region
					roast
					decaf
				}
			}
		`;
		const coffees: { getCoffees: Coffee } = await request(this.endpoint, query);
		return coffees.getCoffees;
	};
}

export function getProduction() {
	return new Production();
}
