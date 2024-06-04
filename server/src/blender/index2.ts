import { Status } from '../types/';
import { Module } from '../module';
import { blendItem } from '../types/blender';
import { coffeeToModules, moduleUrls, CoffeeModule } from './settings';
import { getSiloWithMostWeight } from '../loadBalancer'; // Import the load balancer function

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

	// New method to get the best silo using the load balancer
	public async getBestSiloForCoffee(coffeeId: number): Promise<StationPath | null> {
		const bestSilo = await getSiloWithMostWeight(coffeeId);
		if (!bestSilo) {
			return null;
		}
		return [bestSilo.moduleId, bestSilo.stationId];
	}

	public async blend(blendItems: blendItem[]): Promise<Status> {
		const results = await Promise.all(
			blendItems.map(async blendItem => {
				// Use the new method to get the best silo
				const path = await this.getBestSiloForCoffee(blendItem.coffeeId);
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

	public async stop(): Promise<Status> {
		const results = await Promise.all(this.modules.map(m => m.module.stop()));
		if (results.some(result => !result.success)) {
			return { success: false, code: 400, message: 'One or more modules failed to stop' };
		}
		return { success: true, code: 200, message: 'All modules stopped' };
	}
}

let blender: Blender | null = null;

export function getBlender(): Blender {
	if (!blender) {
		blender = new Blender();
	}
	return blender;
}
