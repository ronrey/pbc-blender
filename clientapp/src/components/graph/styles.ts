import { createStyles } from '../emotion-styles';
export const styles = createStyles({
	empty: {
		textAlign: 'center',
		fontFamily: 'SFBold',
	},
	percentage: {
		fontSize: '1.0rem',
		//fontFamily: 'SFBold',
	},
	grams: {
		fontSize: '1.0rem',
		//fontFamily: 'SFBold',
	},
	barContainer: {
		width: '90%',
		height: '150px',
		border: '1px solid gray',
		position: 'relative',
		margin: 'auto',
	},
	bar: {
		padding: 8,
		margin: '1%',
	},
	values: {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'space-around',
	},
});
