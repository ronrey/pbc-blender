/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from 'react';
import { Typography, Paper, Button } from '@mui/material';
import { styles } from './styles';
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { VerticalBar } from '../../../graph';
import { FeedControl } from './feedControls';
import { GateControl } from './gateControls';
import { Scale } from '../scale';
import { Silo } from '../silo';
interface Props {
	moduleId: number;
	nodeId: number;
}
const REFRESH_RATE_VALUES = 1000;
const SILO_FULL_WEIGHT_GRAMS = 6128.03;
export const Station: React.FC<Props> = ({ moduleId, nodeId }) => {
	const TARE_SILO = gql`
		mutation TareSilo($index: Int, $nodeId: Int) {
			tareSilo(index: $index, nodeId: $nodeId) {
				code
				message
				success
			}
		}
	`;
	const GET_SILO_GRAMS = gql`
		query GetSiloGrams($index: Int, $nodeId: Int) {
			getSiloGrams(index: $index, nodeId: $nodeId) {
				grams
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
	const [grams, setGrams] = useState(0);
	const [getSiloGrams] = useLazyQuery(GET_SILO_GRAMS, {
		fetchPolicy: 'cache-and-network',
		onCompleted: data => {
			const { grams } = data.getSiloGrams;
			setGrams(grams);
		},
		onError: err => {
			console.error(err);
		},
	});
	const fetchGrams = useCallback(
		(nodeId: number) => {
			getSiloGrams({ variables: { index: moduleId, nodeId } });
		},
		[getSiloGrams, nodeId]
	);
	useEffect(() => {
		const interval = setInterval(() => {
			//	debugger;
			fetchGrams(nodeId);
		}, REFRESH_RATE_VALUES);
		return () => clearInterval(interval);
	}, [fetchGrams, nodeId]);
	const onHandleTare = () => {
		tareSilo({
			variables: {
				index: moduleId,
				nodeId: nodeId,
			},
		});
	};
	return (
		<Paper elevation={4} css={styles.container}>
			<Typography css={styles.nodeId}>Station {nodeId}</Typography>
			<Typography css={styles.grams}>{grams.toFixed(2)}</Typography>

			<Silo moduleId={moduleId} nodeId={nodeId} />
			<Scale moduleId={moduleId} nodeId={nodeId} />
			<FeedControl nodeId={nodeId} moduleId={moduleId} />
			<GateControl nodeId={nodeId} moduleId={moduleId} />
		</Paper>
	);
};
