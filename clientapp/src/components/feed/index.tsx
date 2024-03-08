/** @jsxImportSource @emotion/react */
import { Typography, Paper } from "@mui/material";
import { styles } from "./styles";
import { Controls } from "./controls";
interface Props {
  node: number;
}
export const Feed: React.FC<Props> = ({ node }) => {
  return (
    <Paper elevation={4} css={styles.container}>
      <Typography color="primary" variant="h5" css={styles.text}>
        Feed
      </Typography>
      <Controls node={node} />
    </Paper>
  );
};

export default Feed;
