/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Button, CircularProgress, Paper, Typography } from '@mui/material';
import { styles } from './styles';
import { useMutation, gql } from '@apollo/client';
interface Props {
	nodeId: number;
	index: number;
}
export const GateControl: React.FC<Props> = ({ nodeId, index }) => {
	const CYCLE_GATE = gql`
		mutation cycleGate($index: Int, $nodeId: Int) {
			cycleGate(index: $index, nodeId: $nodeId) {
				success
				code
				message
			}
		}
	`;
	const OPEN_GATE = gql`
		mutation openGate($index: Int, $nodeId: Int) {
			openGate(index: $index, nodeId: $nodeId) {
				success
				code
				message
			}
		}
	`;
	const CLOSE_GATE = gql`
		mutation closeGate($index: Int, $nodeId: Int) {
			closeGate(index: $index, nodeId: $nodeId) {
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
	const onHandleOpen = () => {
		openGate({
			variables: {
				index: index,
				nodeId: nodeId,
			},
		});
	};

	const onHandleClose = () => {
		closeGate({
			variables: {
				index: index,
				nodeId: nodeId,
			},
		});
	};
	const onHandleCycle = () => {
		cycleGate({
			variables: {
				index: index,
				nodeId: nodeId,
			},
		});
	};
	return (
		<Paper elevation={4} css={styles.container}>
			{showProgress && <CircularProgress css={styles.progress} />}
			<div css={styles.gateContainer}>
				<Typography css={styles.controlTitle}>Gate</Typography>
				<Button
					variant="contained"
					size="small"
					color="secondary"
					onClick={() => {
						onHandleCycle();
					}}
				>
					cycle
				</Button>
			</div>
			<div css={styles.onOffContainer}>
				<Button
					variant="contained"
					size="small"
					color="primary"
					css={styles.button}
					onClick={() => {
						onHandleOpen();
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
						onHandleClose();
					}}
				>
					close
				</Button>
			</div>
		</Paper>
	);
};
export default GateControl;
