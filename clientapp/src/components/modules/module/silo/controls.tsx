/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { styles } from './styles';
import { useMutation, gql } from '@apollo/client';

interface Props {
	nodeId: number;
	moduleId: number;
}
export const SiloControl: React.FC<Props> = ({ nodeId, moduleId }) => {
	const TARE_SILO = gql`
		mutation TareSilo($index: Int, $nodeId: Int) {
			tareSilo(index: $index, nodeId: $nodeId) {
				code
				message
				success
			}
		}
	`;
	const [showProgress, setShowProgress] = useState(false);
	const [tareSilo, { loading }] = useMutation(TARE_SILO, {
		onCompleted(data) {
			debugger;
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
		tareSilo({
			variables: {
				index: moduleId,
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

export default SiloControl;
