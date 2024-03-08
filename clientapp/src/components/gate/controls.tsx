/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Button, CircularProgress, TextField, Input } from "@mui/material";
import { styles } from "./styles";
import { useMutation, gql } from "@apollo/client";
interface Props {
  node: number;
}

export const Controls: React.FC<Props> = ({ node }) => {
  const VIBRATOR_CYCLE = gql`
  mutation vibratorCycle($onFor: Int, $offFor: Int) {
    vibratorCycle(onFor: $onFor, offFor: $offFor, nodeId: ${node})
  }
`;
  const CYCLE_GATE = gql`
    mutation cycleGate {
      cycleGate(nodeId: ${node}) {
        success
        code
        message
      }
    }
  `;
  const OPEN_GATE = gql`
    mutation openGate {
      openGate(nodeId: ${node}) {
        success
        code
        message
      }
    }
  `;
  const CLOSE_GATE = gql`
    mutation closeGate {
      closeGate(nodeId: ${node}) {
        success
        code
        message
      }
    }
  `;

  const [showProgress, setShowProgress] = useState(false);
  const [openGate] = useMutation(OPEN_GATE, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });
  const [closeGate] = useMutation(CLOSE_GATE, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });
  const [cycleGate] = useMutation(CYCLE_GATE, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      setShowProgress(false);
      debugger;
    },
  });

  return (
    <div css={styles.container}>
      {showProgress && <CircularProgress css={styles.progress} />}
      <div css={styles.onOffContainer}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          css={styles.button}
          onClick={() => {
            cycleGate();
          }}
        >
          cycle
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          css={styles.button}
          onClick={() => {
            openGate();
          }}
        >
          open
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          css={styles.button}
          style={{ marginRight: 0 }}
          onClick={() => {
            closeGate();
          }}
        >
          close
        </Button>
      </div>
    </div>
  );
};

export default Controls;
