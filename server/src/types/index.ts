export interface Status {
	success: boolean;
	code: number;
	message: string;
}

export interface CoffeeModule {
	coffeeId: number;
	moduleId: number;
	stationId: number;
}

export interface Coffee {
	state: string;
	key: number;
	decaf: boolean;
	prices: Array<{
		measurement: string;
		quantity: number;
		price: number;
	}>;
	mouthfeel: number;
	acidity: number;
	caramel: number;
	fruit: number;
	flower: number;
	flavors: string[];
	qualities: string[];
	region: string;
	roast: string;
	paragraphs: string[];
}
