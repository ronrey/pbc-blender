import { createStyles } from '../emotion-styles';
export const styles = createStyles({
	title: {
		margin: 'auto',
		fontFamily: 'SFBold',
		fontSize: '1.5rem',
	},
	titleContainer: {
		margin: 'auto',
		display: 'flex',
	},

	container: {
		display: 'flex',
		flexFlow: 'column',
		margin: '8px auto',
		maxWidth: 600,
	},

	InputAndButton: {
		display: 'flex',
		margin: `8px 0`,
	},

	input: { marginRight: 8, width: 80 },
	controlText: {
		fontSize: '.9rem',
		textAlign: 'center',
		paddingTop: 4,
		marginRight: 8,
	},

	button: {
		marginRight: 8,
	},
	buttonContainer: {
		margin: '0 0 4px 0',
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
});
