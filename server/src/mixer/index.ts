// on(id: Int): Status
// off(id: Int): Status
// cycle(id: Int, duration: Float): Status
// offAll: Status

import { request, gql } from 'graphql-request';
import { Status } from '../types';
import logger from '../winston';
const ENDPOINT = `http://192.168.0.49:4000/graphql`;
const ON_MIXER = gql`
	mutation OnMixer($id: Int!) {
		on(id: $id) {
			success
			code
			message
		}
	}
`;
const OFF_MIXER = gql`
	mutation OffMixer($id: Int!) {
		off(id: $id) {
			success
			code
			message
		}
	}
`;
const CYCLE_MIXER = gql`
	mutation CycleMixer($id: Int!, $duration: Float!) {
		cycle(id: $id, duration: $duration) {
			success
			code
			message
		}
	}
`;
export interface MixerInterface {
	on(): Promise<Status>;
	off(): Promise<Status>;
	cycle(duration: number): Promise<Status>;
}
export class Mixer {
	endpoint: string;
	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}
	async on(): Promise<Status> {
		const variables = {
			id: 0,
		};
		const response: { on: Status } = await request(this.endpoint, ON_MIXER, variables);
		return response.on;
	}
	async off(): Promise<Status> {
		const variables = {
			id: 0,
		};
		const response: { off: Status } = await request(this.endpoint, OFF_MIXER, variables);
		return response.off;
	}
	async cycle(duration: number): Promise<Status> {
		const variables = {
			id: 0,
			duration: duration,
		};
		const response: { cycle: Status } = await request(this.endpoint, CYCLE_MIXER, variables);
		return response.cycle;
	}
}
export function getMixer() {
	return new Mixer(ENDPOINT);
}

export default Mixer;
