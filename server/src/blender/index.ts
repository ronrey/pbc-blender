import { Status } from '../types/blender';
import { BLENDER_NUMBER, SOCKET } from '../constants/blender';
export interface BlendItem {
	coffeeId: number;
	moduleId: number;
	weight: number;
}
const modules = [
	{ url: `http://blender-${BLENDER_NUMBER}-module-0.local:${SOCKET}/graphql` },
	{ url: `http://blender-${BLENDER_NUMBER}-module-1.local:${SOCKET}/graphql` },
	{ url: `http://blender-${BLENDER_NUMBER}-module-2.local:${SOCKET}/graphql` },
	{ url: `http://blender-${BLENDER_NUMBER}-module-3.local:${SOCKET}/graphql` },
	{ url: `http://blender-${BLENDER_NUMBER}-module-4.local:${SOCKET}/graphql` },
	{ url: `http://blender-${BLENDER_NUMBER}-module-5.local:${SOCKET}/graphql` },
];
export async function blend(blendItems: BlendItem[]): Promise<Status> {
	blendItems.map(blendItem => {
		console.log(blendItem);
	});
	return { success: true, code: '200', message: 'blend' };
}
