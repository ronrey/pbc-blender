import { createStyles } from '../emotion-styles';
export const styles = createStyles({
	container: {
		display: 'flex',
		flexFlow: 'column',
		//	width: '90%',
		//	margin: '8px auto',
		// maxWidth: 600,
	},
	buttonContainer: {
		margin: '0 0 8px 0',
		display: 'flex',
		justifyContent: 'center',
		flexFlow: 'column',
	},
	tableContainer: {
		margin: 'auto',
		width: '95%',
	},
	cellHeader: {
		fontFamily: 'SFBold',
		fontSize: '1.2rem',
	},
	cell: {
		fontFamily: 'SFBold',
		fontSize: '1rem',
		padding: '8px 4px 8px 4px',
	},
	header: {
		display: 'flex',
		flexFlow: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	saveButton: {
		marginRight: '2.5%',
		height: 32,
		maxWidth: 200,
		//margin: '0 0 8px 0',
	},
});
