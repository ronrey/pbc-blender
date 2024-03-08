/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button, CircularProgress, Input } from "@mui/material";
import { styles } from "./styles";
import { useMutation, gql } from "@apollo/client";
interface Props {
  node: number;
}

export const Controls: React.FC<Props> = ({ node }) => {
  const FEED = gql`
    mutation feed($nodeId: Int, $grams: Float) {
      feed(nodeId: $nodeId, grams: $grams) {
        success
        code
        message
      }
    }
  `;
  const START_FEED = gql`
    mutation StartFeed($nodeId: Int) {
      startFeed(nodeId: $nodeId) {
        success
        code
        message
      }
    }
  `;
  const STOP_FEED = gql`
    mutation StopFeed($nodeId: Int) {
      stopFeed(nodeId: $nodeId) {
        success
        code
        message
      }
    }
  `;
  const [showProgress, setShowProgress] = useState(false);
  const [grams, setGrams] = useState(1);
  const [startFeed] = useMutation(START_FEED, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });
  const [stopFeed] = useMutation(STOP_FEED, {
    onCompleted(data) {
      setShowProgress(false);
    },
    onError: (err) => {
      debugger;
      setShowProgress(false);
    },
  });

  const [feed, { loading }] = useMutation(FEED, {
    onCompleted(data) {
      console.log(data);
      setShowProgress(false);
    },
    onError: (err) => {
      setShowProgress(false);
      debugger;
    },
  });

  const onHandleStart = () => {
    startFeed({
      variables: {
        nodeId: node,
      },
    });
  };
  const onHandleStop = () => {
    stopFeed({
      variables: {
        nodeId: node,
      },
    });
  };
  const onHandleFeed = () => {
    console.log(`onHandleFeed node: ${node} grams: ${grams}`);
    feed({
      variables: {
        nodeId: node,
        grams: grams,
      },
    });
  };

  useEffect(() => {
    if (loading) setShowProgress(true);
  }, [loading]);
  const handleGramChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrams(parseFloat(event.target.value));
  };
  return (
    <div css={styles.container}>
      {showProgress && <CircularProgress css={styles.progress} />}
      <div css={styles.controls}>
        <div css={styles.InputAndButton}>
          <Input
            type="number"
            css={styles.input}
            value={grams}
            onChange={handleGramChange}
            inputProps={{ min: ".1", max: "500", step: ".1" }}
          />
          <div css={styles.controlText}>grams</div>
          <Button
            css={styles.feedButton}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              onHandleFeed();
            }}
          >
            feed
          </Button>
        </div>
        <div css={styles.onOffContainer}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            css={styles.button}
            onClick={() => {
              onHandleStart();
            }}
          >
            go
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            css={styles.button}
            style={{ marginRight: 0 }}
            onClick={() => {
              onHandleStop();
            }}
          >
            stop
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Controls;
