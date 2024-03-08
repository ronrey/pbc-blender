export interface CoffeeModule {
	coffeeId: number;
	moduleId: number;
	stationId: number;
}
export const coffeeToModules: CoffeeModule[] = [
	{ coffeeId: 0, moduleId: 0, stationId: 0 },
	{ coffeeId: 1, moduleId: 0, stationId: 1 },
	{ coffeeId: 2, moduleId: 0, stationId: 2 },
	{ coffeeId: 3, moduleId: 1, stationId: 0 },
	{ coffeeId: 4, moduleId: 1, stationId: 1 },
	{ coffeeId: 5, moduleId: 1, stationId: 2 },
	{ coffeeId: 6, moduleId: 2, stationId: 0 },
	{ coffeeId: 7, moduleId: 2, stationId: 1 },
	{ coffeeId: 8, moduleId: 2, stationId: 2 },
	{ coffeeId: 9, moduleId: 3, stationId: 0 },
	{ coffeeId: 10, moduleId: 3, stationId: 1 },
	{ coffeeId: 11, moduleId: 3, stationId: 2 },
	{ coffeeId: 12, moduleId: 4, stationId: 0 },
	{ coffeeId: 13, moduleId: 4, stationId: 1 },
	{ coffeeId: 14, moduleId: 4, stationId: 2 },
	{ coffeeId: 15, moduleId: 5, stationId: 0 },
	{ coffeeId: 16, moduleId: 5, stationId: 1 },
	{ coffeeId: 17, moduleId: 5, stationId: 2 },
];

export type ModuleUrl = string;

export const moduleUrls: ModuleUrl[] = [
	`http://pcb1.local:4000/graphql`,
	`http://pcb2.local:4000/graphql`,
	`http://pcb3.local:4000/graphql`,
	`http://pcb4.local:4000/graphql`,
	`http://pcb5.local:4000/graphql`,
	`http://pcb6.local:4000/graphql`,
];
