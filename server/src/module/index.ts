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
	async feed(nodeId: number, grams: number): Promise<Status> {
		const variables = {
			grams: grams,
			nodeId: nodeId,
		};
		console.log('feed', variables);

		const response = (await request(this.endpoint, FEED, variables)) as Status;

		console.log('data', response);
		return response;
	}
}

export default Module;
