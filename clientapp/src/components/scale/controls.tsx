/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { styles } from "./styles";
import { useMutation, gql } from "@apollo/client";
import exp from "constants";

interface Props {
  node: number;
}
export const Controls: React.FC<Props> = ({ node }) => {
  const TARE_SCALE = gql`
    mutation TareScale($nodeId: Int) {
      tareScale(nodeId: $nodeId) {
        success
        code
        message
      }
    }
  `;
  const [showProgress, setShowProgress] = useState(false);
  const [tareScale, { loading }] = useMutation(TARE_SCALE, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });
  useEffect(() => {
    if (loading) setShowProgress(true);
  }, [loading]);
  const onHandleTare = () => {
    tareScale({
      variables: {
        nodeId: node,
      },
    });
  };
  return (
    <div css={styles.container}>
      {showProgress && <CircularProgress css={styles.progress} />}
      <div css={styles.buttons}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          css={styles.button}
          onClick={() => {
            onHandleTare();
          }}
        >
          reset tare
        </Button>
      </div>
    </div>
  );
};

export default Controls;
