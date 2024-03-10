import { request, gql } from 'graphql-request';
import { Status } from '../types';
const GET_GRAMS = gql`
	query getGrams($nodeId: Int) {
		getScaleGrams(nodeId: $nodeId)
	}
`;
const FEED = gql`
	mutation feed($nodeId: Int, $grams: Float) {
		feed(nodeId: $nodeId, grams: $grams)
	}
`;
export interface ModuleInterface {
	getNode(id: number): Promise<any>;
	feed(nodeId: number, grams: number): Promise<Status>;
}
export type StationId = [number, number];
export class Module {
	endpoint: string;
	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}
	getNode = async (id: number) => {
		const variables = {
			nodeId: id,
		};
		const grams = await request(this.endpoint, GET_GRAMS, variables);
		const node = {
			grams: grams,
		};
		console.log('data', node);
		return node;
	};
	async feed(stationId: number, grams: number): Promise<Status> {
		const variables = {
			grams: grams,
			nodeId: stationId,
		};
		console.log('feed', variables, this.endpoint);
		const response = (await request(this.endpoint, FEED, variables)) as Status;
		console.log('data', response);
		return response;
	}
}

export default Module;
