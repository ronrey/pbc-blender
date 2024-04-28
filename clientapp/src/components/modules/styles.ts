import { createStyles } from '../emotion-styles';
export const styles = createStyles({
	moduleContainer: {
		display: 'flex',
		flexFlow: 'row wrap',
		padding: 4,
		margin: 'auto',
	},
	controlContainer: {
		display: 'flex',
		flexFlow: 'row wrap',
		padding: 4,
		margin: 'auto',
	},
	container: {
		display: 'flex',
		flexFlow: 'column',
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	stopButton: {
		width: '80%',
		margin: '8px auto',
	},
});
