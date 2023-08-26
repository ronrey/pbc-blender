export enum State {
	IDLE = 'IDLE',
	RUNNING = 'RUNNING',
	PAUSED = 'PAUSED',
	STOPPED = 'STOPPED',
	ERROR = 'ERROR',
	CALIBRATING = 'CALIBRATING',
	MAINTENANCE = 'MAINTENANCE',
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}
export interface BlendItem {
	coffeeId: number;
	weight: number;
}
export interface Weight {
	raw: number;
	adjusted: number;
}

// export interface Blending {
// 	blenderKey: number;
// 	items: BlendingItem[];
// }
// export interface BlendingItem {
// 	key: number;
// 	weight: Weight;
// }
// export interface Weight {
// 	count: number;
// 	measurement: string;
// }
// export interface ManualInput {
// 	blenderKey: number;
// 	stationId: number;
// 	items: BlendingItem[];
// }

// export interface Blender {
// 	blenderKey: number;
// 	status?: Status;
// 	state?: State;
// 	stations: Station[];
// }
// export interface Station {
// 	key: number;
// 	blenderKey: number;
// 	_id?: string;
// 	status?: Status;
// 	state?: State;
// 	nodes: Node[];
// 	createdAt?: Date;
// 	updatedAt?: Date;
// }
// export interface Node {
// 	key: number;
// 	coffeeKey: number;
// 	status?: Status;
// 	state?: State;
// 	weight?: Weight;
// 	gatePosition?: Number;
// 	createdAt?: Date;
// 	updatedAt?: Date;
// }
// export interface Weight {
// 	count: number;
// 	measurement: string;
// }
export interface Status {
	success: boolean;
	code?: string;
	message?: string;
}
