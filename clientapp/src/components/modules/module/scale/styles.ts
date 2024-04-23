import { createStyles } from '../../../emotion-styles';
export const styles = createStyles({
	container: {
		display: 'flex',
		flexFlow: 'column',
		margin: 4,
		padding: 8,
	},

	progress: {
		zIndex: 2,
		position: 'fixed',
		top: '50%',
		left: '50%',
	},

	button: {
		marginRight: 8,
	},
	grams: {
		fontSize: '.75rem',
		margin: 'auto',
	},
	nodeId: {
		fontSize: '1.0rem',
		margin: 'auto',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'right',
	},
});
