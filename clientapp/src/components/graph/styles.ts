import { createStyles } from '../emotion-styles';
export const styles = createStyles({
	empty: {
		textAlign: 'center',
		fontFamily: 'SFBold',
	},
	percentage: {
		fontSize: '.90rem',
		//fontFamily: 'SFBold',
	},
	grams: {
		fontSize: '.90rem',
		//fontFamily: 'SFBold',
	},
	barContainer: {
		width: '80%',
		height: '120px',
		position: 'relative',
		margin: 'auto',
	},
	bar: {
		padding: 8,
		//	margin: '1%',
	},
	values: {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'space-around',
	},
});
