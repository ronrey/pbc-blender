import { grey } from '@mui/material/colors';
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
		backgroundColor: grey[800],
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	stopButton: {
		width: '80%',
		margin: '8px auto',
	},
});
