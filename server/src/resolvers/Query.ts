//import { AuthenticationError } from 'apollo-server-express';

export const Query = {
	status: async (_: null) => {
		return { success: true, code: '200', message: 'status' };
	},
};
export default Query;
