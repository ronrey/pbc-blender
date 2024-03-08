/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, CircularProgress, Paper } from "@mui/material";
import { styles } from "./styles";
import { useMutation, gql } from "@apollo/client";
interface Props {
  node: number;
}
export const SiloControls: React.FC<Props> = ({ node }) => {
  const TARE_SILO = gql`
    mutation TareSilo($nodeId: Int) {
      tareSilo(nodeId: $nodeId) {
        success
        code
        message
      }
    }
  `;
  const [showProgress, setShowProgress] = useState(false);
  const [tareSilo, { loading }] = useMutation(TARE_SILO, {
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
    tareSilo({
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
export default SiloControls;
