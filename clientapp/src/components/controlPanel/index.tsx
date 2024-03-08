/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { styles } from "./styles";
import { useLazyQuery, gql } from "@apollo/client";
import FeedControl from "../feed";
import ScaleControls from "../scale";
import GateControls from "../gate";
import SiloControls from "../silo";
interface Props {
  node: number;
}
const REFREASH_RATE_GRAMS = 1000;
export const ControlPanel: React.FC<Props> = ({ node }) => {
  const GET_GRAMS = gql`
    query getGrams($nodeId: Int) {
      getScaleGrams(nodeId: $nodeId)
    }
  `;
  const [grams, setGrams] = useState(0);
  const [getGrams] = useLazyQuery(GET_GRAMS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setGrams(data.getScaleGrams);
    },
  });
  const fetchGrams = useCallback(() => {
    getGrams({ variables: { nodeId: node } });
  }, [getGrams, node]);

  function useEffects() {
    useEffect(() => {
      const intervalId = setInterval(fetchGrams, REFREASH_RATE_GRAMS);
      return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, [fetchGrams]);
  }
  function renderControls() {
    return (
      <div css={styles.controlsContainer}>
        <FeedControl node={node} />
        <GateControls node={node} />
        <ScaleControls node={node} />
        <SiloControls node={node} />
      </div>
    );
  }
  useEffects();
  return (
    <div>
      <Typography css={styles.nodeTitle} variant="h6">
        Node {node + 1}
      </Typography>
      {renderControls()}
    </div>
  );
};
export default ControlPanel;
