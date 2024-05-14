export interface blendItem {
	coffeeId: number;
	grams: number;
}
export type TwoNumberTuple = [number, number];

export interface NumberTupleArray {
	[index: number]: TwoNumberTuple;
}
