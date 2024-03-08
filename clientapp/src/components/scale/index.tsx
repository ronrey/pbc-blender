/** @jsxImportSource @emotion/react */
import { Typography, Paper } from "@mui/material";
import { styles } from "./styles";
import { Display } from "./display";
import { Controls } from "./controls";
interface Props {
  node: number;
}
export const Scale: React.FC<Props> = ({ node }) => {
  return (
    <Paper elevation={4} css={styles.container}>
      <Typography color="primary" variant="h5" css={styles.text}>
        Scale
      </Typography>
      <Display node={node} />
      <Controls node={node} />
    </Paper>
  );
};

export default Scale;
