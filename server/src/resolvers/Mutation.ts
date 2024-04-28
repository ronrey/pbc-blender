import { getModuleByNumber } from '../module';

import { getBlender } from '../blender';
import { blendItem } from '../types/blender';
import logger from '../winston';

export const Mutation = {
	blend: async (_: null, args: { blend: blendItem[] }) => {
		return await getBlender().blend(args.blend);
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
};
export default Mutation;
