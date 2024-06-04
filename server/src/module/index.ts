import { request, gql } from 'graphql-request';
import { Status } from '../types';
import { moduleUrls } from '../blender/settings';
import logger from '../winston';
const GET_GRAMS = gql`
	mutation GetGrams($nodeId: Int, $grams: Float) {
		feed(nodeId: $nodeId, grams: $grams) {
			code
			message
			success
		}
	}
`;
const FEED = gql`
	mutation Feed($nodeId: Int, $grams: Float) {
		feed(nodeId: $nodeId, grams: $grams) {
			code
			message
			success
		}
	}
`;
export interface ModuleInterface {
	getNode(id: number): Promise<any>;
	feed(nodeId: number, grams: number): Promise<Status>;
	getServerName(): Promise<string>;
	getScaleReading(nodeId: number): Promise<number>;
	getScaleGrams(nodeId: number): Promise<number>;
	getSiloReading(nodeId: number): Promise<number>;
	getSiloGrams(nodeId: number): Promise<number>;
	getScaleBaseline(nodeId: number): Promise<number>;
	getSiloBaseline(nodeId: number): Promise<number>;
	stopFeed(nodeId: number): Promise<Status>;
	startFeed(nodeId: number): Promise<Status>;
	tareScale(nodeId: number): Promise<Status>;
	tareSilo(nodeId: number): Promise<Status>;
	openGate(nodeId: number): Promise<Status>;
	closeGate(nodeId: number): Promise<Status>;
	cycleGate(nodeId: number): Promise<Status>;
	stop(): Promise<Status>;
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
	async getServerName(): Promise<string> {
		const variables = {};
		const serverName: { getServerName: string } = await request(
			this.endpoint,
			gql`
				query {
					getServerName
				}
			`
		);
		logger.info('endpoint', this.endpoint);
		logger.info('serverName', serverName);
		return serverName.getServerName;
	}
	async stop(): Promise<Status> {
		console.log(`stop: ${this.endpoint}`);
		const response: { stopAll: Status } = await request(
			this.endpoint,
			gql`
				mutation StopAll {
					stopAll {
						code
						success
						message
					}
				}
			`
		);
		return response.stopAll;
	}
	async getScaleReading(nodeId: number): Promise<number> {
		const variables = {
			nodeId: nodeId,
		};
		const reading: { getScaleReading: number } = await request(
			this.endpoint,
			gql`
				query getScaleReading($nodeId: Int) {
					getScaleReading(nodeId: $nodeId)
				}
			`,
			variables
		);
		return reading.getScaleReading;
	}
	async getScaleGrams(nodeId: number): Promise<number> {
		const variables = {
			nodeId: nodeId,
		};
		const grams: { getScaleGrams: number } = await request(
			this.endpoint,
			gql`
				query getScaleGrams($nodeId: Int) {
					getScaleGrams(nodeId: $nodeId)
				}
			`,
			variables
		);
		return grams.getScaleGrams;
	}
	async getSiloReading(nodeId: number): Promise<number> {
		const variables = {
			nodeId: nodeId,
		};
		const reading: { getSiloReading: number } = await request(
			this.endpoint,
			gql`
				query getSiloReading($nodeId: Int) {
					getSiloReading(nodeId: $nodeId)
				}
			`,
			variables
		);
		return reading.getSiloReading;
	}
	async getSiloGrams(nodeId: number): Promise<number> {
		const variables = {
			nodeId: nodeId,
		};
		const grams: { getSiloGrams: number } = await request(
			this.endpoint,
			gql`
				query getSiloGrams($nodeId: Int) {
					getSiloGrams(nodeId: $nodeId)
				}
			`,
			variables
		);
		return grams.getSiloGrams;
	}
	async getScaleBaseline(nodeId: number): Promise<number> {
		const variables = {
			nodeId: nodeId,
		};
		const baseline: { getScaleBaseline: number } = await request(
			this.endpoint,
			gql`
				query getScaleBaseline($nodeId: Int) {
					getScaleBaseline(nodeId: $nodeId)
				}
			`,
			variables
		);
		return baseline.getScaleBaseline;
	}
	async getSiloBaseline(nodeId: number): Promise<number> {
		const variables = {
			nodeId: nodeId,
		};
		const baseline: { getSiloBaseline: number } = await request(
			this.endpoint,
			gql`
				query getSiloBaseline($nodeId: Int) {
					getSiloBaseline(nodeId: $nodeId)
				}
			`,
			variables
		);
		return baseline.getSiloBaseline;
	}
	async stopFeed(nodeId: number): Promise<Status> {
		const variables = {
			nodeId: nodeId,
		};
		const response: { stopFeed: Status } = await request(
			this.endpoint,
			gql`
				mutation stopFeed($nodeId: Int) {
					stopFeed(nodeId: $nodeId) {
						code
						message
						success
					}
				}
			`,
			variables
		);
		return response.stopFeed;
	}
	async startFeed(nodeId: number): Promise<Status> {
		const variables = {
			nodeId: nodeId,
		};
		const response: { startFeed: Status } = await request(
			this.endpoint,
			gql`
				mutation startFeed($nodeId: Int) {
					startFeed(nodeId: $nodeId) {
						code
						message
						success
					}
				}
			`,
			variables
		);
		return response.startFeed;
	}
	async tareScale(nodeId: number): Promise<Status> {
		const variables = {
			nodeId: nodeId,
		};
		const response: { tareScale: Status } = await request(
			this.endpoint,
			gql`
				mutation tareScale($nodeId: Int) {
					tareScale(nodeId: $nodeId) {
						code
						message
						success
					}
				}
			`,
			variables
		);
		return response.tareScale;
	}
	async tareSilo(nodeId: number): Promise<Status> {
		const variables = {
			nodeId: nodeId,
		};
		const response: { tareSilo: Status } = await request(
			this.endpoint,
			gql`
				mutation tareSilo($nodeId: Int) {
					tareSilo(nodeId: $nodeId) {
						code
						message
						success
					}
				}
			`,
			variables
		);
		return response.tareSilo;
	}
	async openGate(nodeId: number): Promise<Status> {
		const variables = {
			nodeId: nodeId,
		};
		const response: { openGate: Status } = await request(
			this.endpoint,
			gql`
				mutation openGate($nodeId: Int) {
					openGate(nodeId: $nodeId) {
						code
						message
						success
					}
				}
			`,
			variables
		);
		return response.openGate;
	}
	async closeGate(nodeId: number): Promise<Status> {
		const variables = {
			nodeId: nodeId,
		};
		const response: { closeGate: Status } = await request(
			this.endpoint,
			gql`
				mutation closeGate($nodeId: Int) {
					closeGate(nodeId: $nodeId) {
						code
						message
						success
					}
				}
			`,
			variables
		);
		return response.closeGate;
	}
	async cycleGate(nodeId: number): Promise<Status> {
		const variables = {
			nodeId: nodeId,
		};
		const response: { cycleGate: Status } = await request(
			this.endpoint,
			gql`
				mutation cycleGate($nodeId: Int) {
					cycleGate(nodeId: $nodeId) {
						code
						message
						success
					}
				}
			`,
			variables
		);
		return response.cycleGate;
	}
}

export function getModuleByNumber(index: number) {
	const url = moduleUrls[index];
	return new Module(url);
}

export default Module;
