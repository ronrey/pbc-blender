/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { styles } from './styles';
import { useMutation, gql } from '@apollo/client';
interface Props {
	nodeId: number;
	index: number;
}
export const ScaleControl: React.FC<Props> = ({ nodeId, index }) => {
	const TARE_SCALE = gql`
		mutation TareScale($index: Int, $nodeId: Int) {
			tareScale(index: $index, nodeId: $nodeId) {
				code
				message
				success
			}
		}
	`;
	const [showProgress, setShowProgress] = useState(false);
	const [tareScale, { loading }] = useMutation(TARE_SCALE, {
		onCompleted(data) {
			setShowProgress(false);
		},
		onError: err => {
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
				index: index,
				nodeId: nodeId,
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

export default ScaleControl;
