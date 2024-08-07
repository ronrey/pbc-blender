import { getModuleByNumber } from '../module';
import { getMixer } from '../mixer';
import { getBlender } from '../blender';
import logger from '../winston';
import { set } from 'lodash';
import { CoffeeModule, blendItem } from '../types';
export const Mutation = {
	blend: async (_: null, args: { orderId: string; itemId: number; blend: blendItem[] }) => {
		const { blend, itemId, orderId } = args;
		const status = await getBlender().blend(args.blend);
		if (status.success) {
			logger.info(`Blended order ${args.orderId} - BLENDED`);
		} else {
			logger.error(`Blended order ${args.orderId} - FAILED, status: ${status.message}`);
		}
		return status;
	},
	stop: async () => {
		return await getBlender().stop();
	},
	stopModule: async (_: null, args: { index: number }) => {
		return getModuleByNumber(args.index).stop();
	},
	stopFeed: async (_: null, args: { index: number; nodeId: number }) => {
		return getModuleByNumber(args.index).stopFeed(args.nodeId);
	},
	startFeed: async (_: null, args: { index: number; nodeId: number }) => {
		return getModuleByNumber(args.index).startFeed(args.nodeId);
	},
	feed: async (_: null, args: { index: number; nodeId: number; grams: number }) => {
		return getModuleByNumber(args.index).feed(args.nodeId, args.grams);
	},
	tareScale: async (_: null, args: { index: number; nodeId: number }) => {
		console.log(`tareScale: ${args.index}, ${args.nodeId}`);
		return getModuleByNumber(args.index).tareScale(args.nodeId);
	},
	tareSilo: async (_: null, args: { index: number; nodeId: number }) => {
		console.log(`tareSilo: ${args.index}, ${args.nodeId}`);
		return getModuleByNumber(args.index).tareSilo(args.nodeId);
	},
	openGate: async (_: null, args: { index: number; nodeId: number }) => {
		return getModuleByNumber(args.index).openGate(args.nodeId);
	},
	closeGate: async (_: null, args: { index: number; nodeId: number }) => {
		return getModuleByNumber(args.index).closeGate(args.nodeId);
	},
	cycleGate: async (_: null, args: { index: number; nodeId: number }) => {
		return getModuleByNumber(args.index).cycleGate(args.nodeId);
	},
	setCoffeeMap: async (_: null, args: { coffeeModules: CoffeeModule[] }) => {
		const blender = getBlender();
		const coffeeToModules = args.coffeeModules.map(cm => {
			return {
				state: cm.state,
				coffeeId: cm.coffeeId,
				moduleId: cm.moduleId,
				stationId: cm.stationId,
			};
		});
		logger.debug('Setting coffee to modules');
		const status = await blender.setCoffeeMap(coffeeToModules);
		return status;
	},

	onMixer: async (_: null, args: null) => {
		return getMixer().on();
	},
	offMixer: async (_: null, args: null) => {
		return getMixer().off();
	},
	cycleMixer: async (_: null, args: { duration: number }) => {
		return getMixer().cycle(args.duration);
	},
};
export default Mutation;
