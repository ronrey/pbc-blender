import { Status } from '../types/blender';
import { BLENDER_NUMBER, SOCKET } from '../constants/blender';
import { Module } from '../module';
export interface BlendItem {
	coffeeId: number;
	moduleId: number;
	weight: number;
}
const modules = [
	{ nodeIds: [0, 1, 2], url: `http://pcb1.local:4000/graphql` },
	{ nodeIds: [3, 4, 5], url: `http://pcb2.local:4000/graphql` },
	{ nodeIds: [6, 7, 8], url: `http://pcb3.local:4000/graphql` },
	{ nodeIds: [9, 10, 11], url: `http://pcb4.local:4000/graphql` },
	{ nodeIds: [12, 13, 14], url: `http://pcb5.local:4000/graphql` },
	{ nodeIds: [15, 16, 16], url: `http://pcb6.local:4000/graphql` },
];

interface module {
	nodeIds: number[];
	module: Module;
}
interface blendItem {
	nodeId: number;
	grams: number;
}

export class Blender {
	private modules: module[];
	constructor() {
		this.modules = modules.map(m => {
			return { nodeIds: m.nodeIds, module: new Module(m.url) };
		});
	}
	getModuleByNodeId(nodeId: number): Module | null {
		const module = this.modules.find(m => m.nodeIds.includes(nodeId));
		return module ? module.module : null;
	}
	async feed(nodeId: number, grams: number): Promise<Status> {
		const module = this.getModuleByNodeId(nodeId);
		if (!module) {
			return Promise.resolve({ success: false, code: '404', message: 'module not found' });
		} else {
			return await module.feed(nodeId, grams);
		}
	}
	async blend(blendItems: BlendItem[]): Promise<Status> {
		const results = await Promise.all(
			blendItems.map(async blendItem => {
				const module = this.getModuleByNodeId(blendItem.moduleId);
				if (!module) {
					throw new Error('Module not found');
				}
				return await module.feed(blendItem.moduleId, blendItem.weight);
			})
		);

		if (results.some(result => !result.success)) {
			return { success: false, code: '400', message: 'One or more blends failed' };
		}
		return { success: true, code: '200', message: 'Blend successful' };
	}
}
