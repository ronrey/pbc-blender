export interface CoffeeMap {
	coffeeId: number;
	moduleId: number;
	stationId: number;
	state: string;
}
export interface Status {
	success: boolean;
	code: number;
	message: string;
}
export interface Coffee {
	state: string;
	key: number;
	decaf: boolean;
	region: string;
	roast: string;
}
