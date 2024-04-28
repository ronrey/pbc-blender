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
	children?: React.ReactNode;
}

const Bar: React.FC<BarProps> = ({ percentage, color = 'saddlebrown' }) => {
	const barStyle: React.CSSProperties = {
		position: 'absolute',
		bottom: 0,
		width: '82%',
		height: `${percentage}%`,
		//	marginTop: 'auto',
		marginBottom: 2, //'auto',
		marginLeft: '2%', //'auto',
		backgroundColor: color,
		borderRadius: '0 0 6px 6px',
	};

	return percentage ? <div css={styles.bar} style={barStyle}></div> : null;
};

export const VerticalBar: React.FC<VerticalBarProps> = ({ percentage, grams, showColor = false }) => {
	const percent = percentage > 100 ? 100 : percentage < 0 ? 0 : percentage;
	const color = showColor ? (percentage >= 100 ? 'red' : 'saddlebrown') : 'transparent';

	return (
		<Paper elevation={4} css={styles.barContainer}>
			<div css={styles.values}>
				<Typography css={styles.percentage}>{percentage.toFixed(0)}%</Typography>
				<Typography css={styles.grams}>{grams.toFixed(0)} g</Typography>
			</div>
			{percentage < 5 ? <Typography css={styles.empty}>empty</Typography> : null}
			{percentage > 5 ? <Bar percentage={percent} color={color} /> : null}
		</Paper>
	);
};

export default VerticalBar;
