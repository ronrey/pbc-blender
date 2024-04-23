/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { styles } from './styles';
import { useLazyQuery, gql } from '@apollo/client';
import { VerticalBar } from '../../../graph';
import { ScaleControl } from './controls';
interface Props {
	moduleId: number;
	nodeId: number;
}
const REFRESH_RATE_VALUES = 1000;
const FULL_WEIGHT_GRAMS = 641.29;
export const Scale: React.FC<Props> = ({ moduleId, nodeId }) => {
	const GET_SILO_GRAMS = gql`
		query GetScaleGrams($index: Int, $nodeId: Int) {
			getScaleGrams(index: $index, nodeId: $nodeId)
		}
	`;
	const [grams, setGrams] = useState(0);
	const [getScaleGrams] = useLazyQuery(GET_SILO_GRAMS, {
		fetchPolicy: 'cache-and-network',
		onCompleted: data => {
			const grams = data.getScaleGrams;
			setGrams(grams);
		},
		onError: err => {
			console.error(err);
		},
	});
	const fetchGrams = useCallback(
		(nodeId: number) => {
			getScaleGrams({ variables: { index: moduleId, nodeId } });
		},
		[getScaleGrams, moduleId]
	);
	useEffect(() => {
		const interval = setInterval(() => {
			//	debugger;
			fetchGrams(nodeId);
		}, REFRESH_RATE_VALUES);
		return () => clearInterval(interval);
	}, [fetchGrams, nodeId]);
	return (
		<Paper elevation={4} css={styles.container}>
			<Typography css={styles.nodeId}>Scale {nodeId}</Typography>
			<Typography css={styles.grams}>{grams.toFixed(2)}</Typography>
			<VerticalBar percentage={(grams / FULL_WEIGHT_GRAMS) * 100} />
			<ScaleControl nodeId={nodeId} moduleId={moduleId} />
		</Paper>
	);
};
