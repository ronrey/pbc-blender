/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Button, CircularProgress, TextField, Input, Paper, Typography } from '@mui/material';
import { styles } from './styles';
import { useMutation, gql } from '@apollo/client';
interface Props {
	nodeId: number;
	moduleId: number;
}

export const GateControl: React.FC<Props> = ({ nodeId, moduleId }) => {
	const CYCLE_GATE = gql`
		mutation cycleGate {
			cycleGate(moduleId: moduleId, nodeId: nodeId) {
				success
				code
				message
			}
		}
	`;
	const OPEN_GATE = gql`
		mutation openGate {
			openGate(moduleId: moduleId, nodeId: nodeId) {
				success
				code
				message
			}
		}
	`;
	const CLOSE_GATE = gql`
		mutation closeGate {
			closeGate(moduleId: moduleId, nodeId: nodeId) {
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
		onError: err => {
			debugger;
			setShowProgress(false);
		},
	});
	const [closeGate] = useMutation(CLOSE_GATE, {
		onCompleted(data) {
			setShowProgress(false);
		},
		onError: err => {
			debugger;
			setShowProgress(false);
		},
	});
	const [cycleGate] = useMutation(CYCLE_GATE, {
		onCompleted(data) {
			setShowProgress(false);
		},
		onError: err => {
			setShowProgress(false);
			debugger;
		},
	});

	return (
		<Paper elevation={4} css={styles.container}>
			{showProgress && <CircularProgress css={styles.progress} />}
			<Typography css={styles.controlTitle}>Gate</Typography>

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
		</Paper>
	);
};

export default GateControl;
