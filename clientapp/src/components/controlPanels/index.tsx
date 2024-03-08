/** @jsxImportSource @emotion/react */
// src/Counter.tsx
import React, { useEffect, useState } from "react";

import { Typography, Paper, Button } from "@mui/material";
import { styles } from "./styles";
import { ControlPanel } from "../controlPanel";
import { useMutation, gql } from "@apollo/client";
import useConfig from "../hooks/useConfig";
interface Props {}
const panels = [
  {
    name: "one",
  },
  {
    name: "two",
  },
  {
    name: "three",
  },
];

export const ControlPanels: React.FC<Props> = () => {
  const STOP = gql`
    mutation stopAll {
      stopAll {
        code
      }
    }
  `;
  const { config, isLoading, error } = useConfig();
  const [serverName, setServerName] = useState("");
  const [stop] = useMutation(STOP, {
    onCompleted(data) {
      console.log(`stopped, data:${data}`);
    },
    onError: (err) => {
      debugger;
    },
  });

  const callStopAll = () => {
    console.log("callStopAll");
    stop();
  };
  useEffect(() => {
    debugger;
    if (config) {
      // @ts-ignore
      config.serverName && setServerName(config.serverName);
    }
  }, [config]);
  return (
    <div css={styles.container}>
      <Typography css={styles.titleContainer}>v a1.002</Typography>
      <Typography css={styles.title}>{serverName}</Typography>

      <Button
        css={styles.stopButton}
        variant="contained"
        size="large"
        color="error"
        onClick={() => {
          callStopAll();
        }}
      >
        Emergency Stop
      </Button>

      <div css={styles.controlPanels}>
        {panels.map((p, i) => (
          <ControlPanel node={i} key={i} />
        ))}
      </div>
    </div>
  );
};

export default ControlPanels;

// interface Props {}
// const panels = [
//   {
//     name: "one",
//   },
//   {
//     name: "two",
//   },
//   {
//     name: "three",
//   },
// ];
// // export const ControlPanels: React.FC<Props> = () => {
// //   const STOP = gql`
// //     mutation stop {
// //       stop
// //     }
// //   `;
//   // const [stop] = useMutation(STOP, {
//   //   onCompleted(data) {
//   //     console.log(`stopped, data:${data}`);
//   //   },
//   //   onError: (err) => {
//   //     debugger;
//   //   },
//   // });
//   return (
//     <div css={styles.container}>
//       <Button
//         css={styles.stopButton}
//         variant="contained"
//         size="large"
//         color="error"
//         onClick={() => {
//           //   stop();
//         }}
//       >
//         Emergency Stop
//       </Button>
//       <div css={styles.controlPanels}>
//         test
//         {/* {panels.map((p, i) => (
//           <ControlPanel node={i} key={i} />
//         ))} */}
//       </div>
//     </div>
//   );
// };
