/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { styles } from './styles';
import { useLazyQuery, gql } from '@apollo/client';
import { VerticalBar } from '../../../graph';
interface Props {
	index: number;
	nodeId: number;
}
const REFRESH_RATE_VALUES = 1000;
const SILO_FULL_WEIGHT_GRAMS = 6128.03;
export const Silo: React.FC<Props> = ({ index, nodeId }) => {
	const GET_SILO_GRAMS = gql`
		query GetSiloGrams($index: Int, $nodeId: Int) {
			getSiloGrams(index: $index, nodeId: $nodeId) {
				grams
			}
		}
	`;
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
			getSiloGrams({ variables: { index: index, nodeId } });
		},
		[getSiloGrams, index]
	);
	useEffect(() => {
		const interval = setInterval(() => {
			fetchGrams(nodeId);
		}, REFRESH_RATE_VALUES);
		return () => clearInterval(interval);
	}, [fetchGrams, nodeId]);
	return (
		<Paper css={styles.container} variant="outlined">
			<Typography variant="h4">Silo</Typography>
			<VerticalBar showColor={true} grams={grams} percentage={(grams / SILO_FULL_WEIGHT_GRAMS) * 100} />
		</Paper>
	);
};
