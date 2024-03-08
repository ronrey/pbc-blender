import { Status } from '../types/';
import { Module, ModuleInterface } from '../module';
import { blendItem, NumberTupleArray, TwoNumberTuple } from '../types/blender';
import { coffeeToModules, moduleUrls, CoffeeModule, ModuleUrl } from './settings';

interface moduleInterface {
	moduleId: number;
	module: Module;
}

export interface blenderInterface {
	blend(blendItems: blendItem[]): Promise<Status>;
}
export type StationPath = [number, number];

class Blender {
	private modules: moduleInterface[];
	constructor() {
		this.modules = moduleUrls.map((m, i) => {
			return { moduleId: i, module: new Module(m) };
		});
	}
	private GetPathByCoffeeId(coffeeId: number): StationPath | undefined {
		const coffee: CoffeeModule | undefined = coffeeToModules.find(
			(coffee: CoffeeModule) => coffee.coffeeId === coffeeId
		);
		if (!coffee) {
			return undefined;
		}
		return [coffee.moduleId, coffee.stationId];
	}

	public async blend(blendItems: blendItem[]) {
		const results = await Promise.all(
			blendItems.map(async blendItem => {
				const path = this.GetPathByCoffeeId(blendItem.coffeeId);
				if (!path) {
					throw new Error('Module not found');
				}
				const module = this.modules[path[0]].module;
				const stationId = path[1];
				return await module.feed(stationId, blendItem.grams);
			})
		);
		if (results.some(result => !result.success)) {
			return { success: false, code: 400, message: 'One or more blends failed' };
		}
		return { success: true, code: 200, message: 'Blend successful' };
	}
}
let blender: Blender | null = null;
export function getBlender() {
	if (!blender) {
		blender = new Blender();
	}
	return blender;
}
