import { createStyles } from '../../../emotion-styles';
export const styles = createStyles({
	title: {
		margin: 'auto',
		fontFamily: 'SFBold',
		fontSize: '1.5rem',
	},
	controlTitle: {
		//	margin: 'auto',
		fontFamily: 'SFBold',
		fontSize: '1.0rem',
	},
	titleContainer: {
		margin: 'auto',
		display: 'flex',
	},
	stateContainer: {
		display: 'flex',
		flexFlow: 'row wrap',
		padding: 4,
		margin: 'auto',
	},
	controlContainer: {
		display: 'flex',
		flexFlow: 'column wrap',
		padding: 4,
		margin: 'auto',
	},
	blendControlContainer: {
		display: 'flex',
		flexFlow: 'row wrap',
		padding: 4,
		margin: 'auto',
	},
	container: {
		display: 'flex',
		flexFlow: 'column',
		margin: 4,
		padding: 4,
	},
	stopButton: {
		width: '80%',
		margin: '8px auto',
	},

	progress: {
		zIndex: 2,
		position: 'fixed',
		top: '50%',
		left: '50%',
	},
	InputAndButton: {
		display: 'flex',
		margin: `8px 0`,
	},
	controls: {
		display: 'flex',
		flexFlow: 'column',
	},
	input: { marginRight: 8, width: 52 },
	controlText: {
		fontSize: '.9rem',
		textAlign: 'center',
		paddingTop: 4,
		marginRight: 8,
	},
	feedButton: {
		marginLeft: 8,
	},
	onOffContainer: {
		display: 'flex',
		marginTop: 20,
		marginBottom: 8,
		justifyContent: 'flex-end',
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
	gateContainer: {
		display: 'flex',
		flexFlow: 'row wrap',
		//padding: 4,
		//margin: 'auto',
		justifyContent: 'space-between',
	},
});
