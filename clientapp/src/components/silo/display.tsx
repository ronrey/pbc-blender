/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { styles } from "./styles";
import { useLazyQuery, gql } from "@apollo/client";
interface Props {
  node: number;
}
const REFRESH_RATE_VALUES = 1000;
export const SiloDisplay: React.FC<Props> = ({ node }) => {
  const GET_GRAMS = gql`
    query getGrams($nodeId: Int) {
      getSiloGrams(nodeId: $nodeId)
    }
  `;
  const GET_READING = gql`
    query getReading($nodeId: Int) {
      getSiloReading(nodeId: $nodeId)
    }
  `;
  const GET_BASELINE = gql`
    query getSiloBaseline($nodeId: Int) {
      getSiloBaseline(nodeId: $nodeId)
    }
  `;

  const [diff, setDiff] = useState(0);
  const [grams, setGrams] = useState(0);
  const [getGrams] = useLazyQuery(GET_GRAMS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setGrams(data.getSiloGrams);
    },
  });
  const fetchGrams = useCallback(() => {
    getGrams({ variables: { nodeId: node } });
  }, [getGrams, node]);
  const [reading, setReading] = useState(0);
  const [getReading] = useLazyQuery(GET_READING, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const newReading = data.getSiloReading;
      setDiff(reading - newReading);
      setReading(newReading);
    },
  });
  const fetchReading = useCallback(() => {
    getReading({ variables: { nodeId: node } });
  }, [getReading, node]);

  const [baseline, setBaseline] = useState(0);
  const [getBaseline] = useLazyQuery(GET_BASELINE, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const newBaseline = data.getSiloBaseline;
      setBaseline(newBaseline);
    },
  });
  const fetchBaseline = useCallback(() => {
    getBaseline({ variables: { nodeId: node } });
  }, [getBaseline, node]);
  function useEffects() {
    useEffect(() => {
      const intervalId = setInterval(fetchGrams, REFRESH_RATE_VALUES);
      return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);
    useEffect(() => {
      const intervalId = setInterval(fetchReading, REFRESH_RATE_VALUES);
      return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);
    useEffect(() => {
      const intervalId = setInterval(fetchBaseline, REFRESH_RATE_VALUES);
      return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);
  }
  useEffects();
  return (
    <div>
      <Typography css={styles.label} variant="h6">
        Grams: {grams}
      </Typography>
      <Typography css={styles.label} variant="h6">
        Ounces: {(grams * 0.03527396).toFixed(3)}
      </Typography>
      <Typography css={styles.label} variant="h6">
        Pounds: {(grams * 0.00220462).toFixed(3)}
      </Typography>
      <Typography css={styles.label} variant="h6">
        Baseline: {baseline.toFixed(3)}
      </Typography>
      <Typography css={styles.label} variant="h6">
        Raw: {reading}
      </Typography>
      <Typography css={styles.label} variant="h6">
        change: {diff.toFixed(1)}
      </Typography>
    </div>
  );
};
export default SiloDisplay;
