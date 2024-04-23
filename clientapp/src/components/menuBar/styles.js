import { createStyles } from "../emotion-styles";
export const styles = createStyles({
	container: {
		display: "flex",
		flex: "2",
	},
	button: {
		maxHeight: 32,
	},
	buttons: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	image: {
		maxWidth: 800,
		margin: 8,
		width: "85%",
	},
	imageRow: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 8,
		cursor: "pointer",
	},
	header: {
		display: "flex",
		flexFlow: "column",
		width: "100%",
		// justifyContent: "center",
		//  alignItems: "center",
	},
	title: {
		textAlign: "center",
		fontSize: "1.75rem",
		fontFamily: "Gaitera",
		textTransform: "capitalize",
		webkitTextStrokeWidth: 1,
		webkitTextStrokeWidthColor: "white",
	},
});
