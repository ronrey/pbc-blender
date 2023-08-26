//import { AuthenticationError } from 'apollo-server-express';

import { blend, BlendItem } from '../blender';

export const Mutation = {
	blend: async (_: null, args: { blend: BlendItem[] }) => {
		return await blend(args.blend);
	},
	stop: async () => {
		return { success: true, code: '200', message: 'stop' };
	},
};
export default Mutation;
