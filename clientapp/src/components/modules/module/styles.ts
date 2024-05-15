import { grey } from '@mui/material/colors';
import { createStyles } from '../../emotion-styles';
export const styles = createStyles({
	title: {
		margin: 'auto',
		fontFamily: 'SFBold',
		fontSize: '1.5rem',
	},
	stateContainer: {
		display: 'flex',
		flexFlow: 'row wrap',
		padding: 4,
		margin: 4,
	},
	container: {
		display: 'flex',
		flexFlow: 'column',
		margin: 'auto ',
		padding: 4,
		marginTop: 8,
	},
	stopButton: {
		width: '80%',
		margin: '8px auto',
	},
});
