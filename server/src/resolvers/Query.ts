import { getModuleByNumber } from '../module';
import { getBlender } from '../blender';
import { getProduction } from '../production';
export const Query = {
	status: async (_: null) => {
		return { success: true, code: '200', message: 'status' };
	},
	getServerName: async (_: null, args: { index: number }): Promise<string> => {
		console.log('getServerName', args.index);
		const module = getModuleByNumber(args.index);
		console.log('module', module);
		const serverName = await module.getServerName();
		console.log('serverName', serverName);
		return await serverName;
	},
	getScaleReading: async (_: null, args: { index: number; nodeId: number }) => {
		return getModuleByNumber(args.index).getScaleReading(args.nodeId);
	},
	getScaleGrams: async (_: null, args: { index: number; nodeId: number }) => {
		return getModuleByNumber(args.index).getScaleGrams(args.nodeId);
	},
	getSiloReading: async (_: null, args: { index: number; nodeId: number }) => {
		return getModuleByNumber(args.index).getSiloReading(args.nodeId);
	},
	getSiloGrams: async (_: null, args: { index: number; nodeId: number }) => {
		return {
			grams: getModuleByNumber(args.index).getSiloGrams(args.nodeId),
			index: args.index,
			nodeId: args.nodeId,
		};
	},
	getScaleBaseline: async (_: null, args: { index: number; nodeId: number }) => {
		return getModuleByNumber(args.index).getScaleBaseline(args.nodeId);
	},
	getSiloBaseline: async (_: null, args: { index: number; nodeId: number }) => {
		return getModuleByNumber(args.index).getSiloBaseline(args.nodeId);
	},
	getCoffeeMap: async () => {
		const blender = getBlender();
		return await blender.getCoffeeMap();
	},
	getCoffeeByKey: async (_: null, args: { key: number }) => {
		console.log('getCoffeeByKey', args.key);
		return await getProduction().getCoffeeByKey(args.key);
	},
	getCoffees: async () => {
		return await getProduction().getCoffees();
	},
};
export default Query;
