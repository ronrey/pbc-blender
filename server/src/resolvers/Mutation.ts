//import { AuthenticationError } from 'apollo-server-express';

import { getBlender } from '../blender';
import { blendItem } from '../types/blender';

export const Mutation = {
	blend: async (_: null, args: { blend: blendItem[] }) => {
		return await getBlender().blend(args.blend);
	},
	stop: async () => {
		return { success: true, code: '200', message: 'stop' };
	},
};
export default Mutation;
