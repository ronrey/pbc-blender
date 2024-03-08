import { createStyles } from "../emotion-styles";
export const styles = createStyles({
  title: {
    margin: "auto",
    fontFamily: "SFBold",
    fontSize: "1.5rem",
  },
  titleContainer: {
    margin: "auto",
    display: "flex",
  },
  controlPanels: {
    display: "flex",
    flexFlow: "row wrap",
    padding: 8,
    margin: "auto",
  },
  container: {
    display: "flex",
    flexFlow: "column",
  },
  stopButton: {
    width: "80%",
    margin: "8px auto",
  },
});
