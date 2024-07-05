import fs from 'fs';
import path from 'path';
import { Status } from '../types/';
import { Module } from '../module';
import { blendItem } from '../types';
import { moduleUrls } from './settings';
import { CoffeeModule } from '../types';
import coffeeMapData from './coffeeMap.json';
import { getMixer } from '../mixer';
interface moduleInterface {
	moduleId: number;
	module: Module;
}
const MIX_DURTATION = 4000;
export interface blenderInterface {
	blend(blendItems: blendItem[]): Promise<Status>;
	getCoffeeMap(): Promise<CoffeeModule[]>;
	setCoffeeMap(coffeeToModules: CoffeeModule[]): Promise<Status>;
	stop(): Promise<Status>;
}
export type StationPath = [number, number];
export class Blender {
	private modules: moduleInterface[];
	private coffeeToModules: CoffeeModule[] = coffeeMapData;
	constructor() {
		this.modules = moduleUrls.map((m, i) => {
			return { moduleId: i, module: new Module(m) };
		});
	}
	// private GetPathByCoffeeId(coffeeId: number): StationPath | undefined {
	// 	debugger;
	// 	const active = this.coffeeToModules.filter(coffee => coffee.state === 'active');
	// 	const coffee: CoffeeModule | undefined = active.find((coffee: CoffeeModule) => coffee.coffeeId === coffeeId);
	// 	if (!coffee) {
	// 		throw new Error('Coffee not found');
	// 	}
	// 	return [coffee.moduleId, coffee.stationId];
	// }
	private async GetPathByCoffeeId(coffeeId: number): Promise<StationPath | undefined> {
		const active = this.coffeeToModules.filter(coffee => coffee.state === 'active' && coffee.coffeeId === coffeeId);

		if (active.length === 0) {
			throw new Error('Coffee not found or not active');
		}

		if (active.length === 1) {
			return [active[0].moduleId, active[0].stationId];
		}

		// Multiple stations with the same coffee, find the one with the most coffee
		let maxCoffeeAmount = -1;
		let selectedStation: CoffeeModule | undefined;

		for (const station of active) {
			const module = this.modules[station.moduleId].module;
			const coffeeAmount = await module.getSiloGrams(station.stationId);

			if (coffeeAmount > maxCoffeeAmount) {
				maxCoffeeAmount = coffeeAmount;
				selectedStation = station;
			}
		}

		if (!selectedStation) {
			throw new Error('Unable to determine station with most coffee');
		}

		return [selectedStation.moduleId, selectedStation.stationId];
	}
	public async setCoffeeMap(coffeeToModules: CoffeeModule[]): Promise<Status> {
		this.coffeeToModules = coffeeToModules;
		const coffeeMapFilePath = path.join(__dirname, 'coffeeMap.json');
		fs.writeFileSync(coffeeMapFilePath, JSON.stringify(coffeeToModules, null, 2));
		return { success: true, code: 200, message: 'Coffee to modules set' };
	}
	public async getCoffeeMap(): Promise<CoffeeModule[]> {
		return this.coffeeToModules;
	}
	public async blend(blendItems: blendItem[]): Promise<Status> {
		const results = await Promise.all(
			blendItems.map(async blendItem => {
				const path = await this.GetPathByCoffeeId(blendItem.coffeeId);
				if (!path) {
					throw new Error(`Module not found for coffeeId: ${blendItem.coffeeId}`);
				}
				const module = this.modules[path[0]].module;
				const stationId = path[1];
				const result = await module.feed(stationId, blendItem.grams);
				console.log(`Blending ${blendItem.coffeeId} - ${blendItem.grams} grams, result: ${result.message}	`);
				return result;
			})
		);
		if (!results) {
			debugger;
			return { success: false, code: 400, message: 'blend failed' };
		}
		if (results.some(result => !result.success)) {
			debugger;

			return { success: false, code: 400, message: 'One or more blends failed' };
		}
		//////// mixer goes here
		debugger;

		await getMixer().cycle(MIX_DURTATION);
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
