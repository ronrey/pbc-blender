/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography, Paper } from '@mui/material';
import { styles } from './styles';
import { FeedControl } from './feedControls';
import { GateControl } from './gateControls';
import { Scale } from '../scale';
import { Silo } from '../silo';
interface Props {
	index: number;
	nodeId: number;
}
export const Station: React.FC<Props> = ({ index, nodeId }) => {
	return (
		<Paper css={styles.container} variant="outlined">
			<Typography css={styles.nodeId}>{nodeId + 1}</Typography>
			<Silo index={index} nodeId={nodeId} />
			<Scale index={index} nodeId={nodeId} />
			<FeedControl nodeId={nodeId} index={index} />
			<GateControl nodeId={nodeId} index={index} />
		</Paper>
	);
};
