// Filename: hx711.d.ts

// Since the file you provided uses the 'pigpio' library, we'll need to declare the Gpio type.
// If the 'pigpio' library already has TypeScript type definitions (e.g., @types/pigpio),
// you can simply import the types. If not, we'll make a basic declaration here.
declare module 'pigpio' {
	export class Gpio {
		constructor(pinNumber: number, options: { mode: number; pullUpDown?: number });

		digitalWrite(value: number): void;
		digitalRead(): number;
	}
}

// HX711 class declaration
declare module 'hx711' {
	export default class HX711 {
		constructor(clockPin: number, dataPin: number, options?: HX711Options);

		readRaw(times?: number): Promise<number>;
		readOffset(times?: number): Promise<number>;
		read(times?: number): Promise<number>;

		getLastRaw(): number;
		getLastOffset(): number;
		getLast(): number;

		tare(times?: number): Promise<void>;

		// These could be functions or static numbers, so we'll use the type '() => number | number'.
		scale: (() => number) | number;
		offset: (() => number) | number;
		continous: boolean | number;
	}

	export interface HX711Options {
		scale?: (() => number) | number;
		offset?: (() => number) | number;
		continous?: boolean | number;
	}
}
