import { createStyles } from '../emotion-styles';
export const styles = createStyles({
	container: {
		display: 'flex',
		flexFlow: 'column wrap',
		//justifyContent: "center",
		// margin: "auto",
		// width: 388,
		margin: 8,
		padding: 4,
	},
	inputContainer: {
		display: 'flex',
	},
	title: {
		//margin: "auto",
		//textAlign: 'center'
	},
	generalTextField: {
		width: 100,
		//  margin: 8,
		// padding: 0
	},
	paper: {
		margin: 8,
	},
	editContainer: {
		display: 'flex',
		flexFlow: 'row',
		//justifyContent: 'space-around',
		alignItems: 'center',
		margin: 'auto',
		marginBottom: 32,
		padding: 4,
	},
	itemContainer: {
		display: 'flex',
		flexFlow: 'column',
		margin: 'auto',
		//justifyContent: 'space-around',
		alignItems: 'center',
		// padding: 4
	},
	item: {
		display: 'flex',
		flexFlow: 'row',
		//justifyContent: 'space-between',
		alignItems: 'center',
		// padding: 4
	},
	editInput: {
		//width: 100
	},
	for: {
		marginLeft: 4,
		marginRight: 4,
		textAlign: 'center',
	},
});
