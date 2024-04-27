/** @jsxImportSource @emotion/react */
import React from 'react';
import { styles } from './styles';
import { Paper, Typography } from '@mui/material';
interface VerticalBarProps {
	percentage: number;
	grams: number;
	showColor?: boolean;
}
interface BarProps {
	percentage: number;
	color: string;
	children?: React.ReactNode; // Add this line
}
const Bar: React.FC<BarProps> = ({ percentage, color }) => {
	const barStyle: React.CSSProperties = {
		position: 'absolute',
		bottom: 0,
		width: '90%',
		height: `${percentage}%`,
		backgroundColor: color,
	};

	return percentage ? <div css={styles.bar} style={barStyle}></div> : null;
};
export const VerticalBar: React.FC<VerticalBarProps> = ({ percentage, grams, showColor = false }) => {
	const percent = percentage > 100 ? 100 : percentage < 0 ? 0 : percentage;
	return (
		<Paper elevation={4} css={styles.barContainer}>
			<div css={styles.values}>
				<Typography css={styles.percentage}>{percentage.toFixed(2)}%</Typography>
				<Typography css={styles.grams}>{grams.toFixed(2)}</Typography>
			</div>
			{percentage < 10 ? <Typography css={styles.empty}>empty</Typography> : null}
			{percentage > 5 ? (
				<Bar percentage={percent} color={showColor && percentage < 10 ? 'red' : 'green'}></Bar>
			) : null}
		</Paper>
	);
};
export default VerticalBar;
