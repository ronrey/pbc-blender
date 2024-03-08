/** @jsxImportSource @emotion/react */
import { Typography, Paper } from "@mui/material";
import { styles } from "./styles";
import Display from "./display";
import { SiloControls } from "./controls";
interface Props {
  node: number;
}
export const Scale: React.FC<Props> = ({ node }) => {
  return (
    <Paper elevation={4} css={styles.container}>
      <Typography color="primary" variant="h5" css={styles.text}>
        Silo
      </Typography>
      <Display node={node} />
      <SiloControls node={node} />
    </Paper>
  );
};

export default Scale;
