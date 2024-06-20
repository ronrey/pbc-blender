import fs from 'fs';
import path from 'path';
import { Status } from '../types/';
import { Module } from '../module';
import { blendItem } from '../types';
import { moduleUrls } from './settings';
import { CoffeeModule } from '../types';
import coffeeMapData from './coffeeMap.json';
interface moduleInterface {
	moduleId: number;
	module: Module;
}
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
	private GetPathByCoffeeId(coffeeId: number): StationPath | undefined {
		const active = this.coffeeToModules.filter(coffee => coffee.state === 'active');
		const coffee: CoffeeModule | undefined = active.find((coffee: CoffeeModule) => coffee.coffeeId === coffeeId);
		if (!coffee) {
			return undefined;
		}
		return [coffee.moduleId, coffee.stationId];
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
					throw new Error('Module not found');
				}
				const module = this.modules[path[0]].module;
				const stationId = path[1];
				return await module.feed(stationId, blendItem.grams);
			})
		);
		if (!results) {
			return { success: false, code: 400, message: 'blend failed' };
		}
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
