/** @jsxImportSource @emotion/react */

import React from 'react';
import styled from 'styled-components';
import { styles } from './styles';
import { Button, CircularProgress, Input, Paper, Typography } from '@mui/material';

interface VerticalBarProps {
	percentage: number;
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
export const VerticalBar: React.FC<VerticalBarProps> = ({ percentage }) => {
	const percent = percentage > 100 ? 100 : percentage < 0 ? 0 : percentage;
	return (
		<Paper elevation={4} css={styles.barContainer}>
			<Typography css={styles.percentage}>{percentage.toFixed(2)}%</Typography>

			{percentage < 10 ? <Typography css={styles.empty}>empty</Typography> : null}
			<Bar percentage={percent} color={percentage < 10 ? 'red' : 'green'}></Bar>
		</Paper>
	);
};

export default VerticalBar;
