/** @jsxImportSource @emotion/react */
// src/Counter.tsx
import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Input } from '@mui/material';
import { Typography, Paper } from '@mui/material';
import { styles } from './styles';
import { ControlPanel } from '../controlPanel';
import { useMutation, gql } from '@apollo/client';
import useConfig from '../hooks/useConfig';
import { render } from '@testing-library/react';
import BlendList from '../BlendList';
interface Props {}
export interface BlendItem {
	coffeeId: number;
	grams: number;
}
const blendListProto = [
	{ coffeeId: 0, grams: 0 },
	{ coffeeId: 1, grams: 0 },
	{ coffeeId: 2, grams: 0 },
	{ coffeeId: 3, grams: 0 },
	{ coffeeId: 4, grams: 0 },
];
export const BlenderControls: React.FC<Props> = () => {
	const STOP = gql`
		mutation stopAll {
			stopAll {
				code
			}
		}
	`;
	const BLEND = gql`
		mutation Blend($blend: [BlendItemInput]) {
			blend(blend: $blend) {
				code
				message
				success
			}
		}
	`;
	const [grams, setGrams] = useState(1);
	const [showProgress, setShowProgress] = useState(false);
	const [blendList, setBlendList] = useState(blendListProto);
	const [blenderControls] = useMutation(BLEND, {
		onCompleted(data) {
			setShowProgress(false);
			debugger;
		},
		onError: err => {
			debugger;
			setShowProgress(false);
		},
	});
	const [stop] = useMutation(STOP, {
		onCompleted(data) {
			console.log(`stopped, data:${data}`);
		},
		onError: err => {
			debugger;
		},
	});

	function callStopAll() {
		console.log('callStopAll');
		stop();
	}
	function renderState() {
		return (
			<div css={styles.stateContainer}>
				<Typography css={styles.title} variant="h6">
					state
				</Typography>
			</div>
		);
	}
	function renderControls() {
		return (
			<div css={styles.controlContainer}>
				<Typography css={styles.title} variant="h6">
					controls
				</Typography>
				{renderBlendControl()}
			</div>
		);
	}
	function onListChange(list: BlendItem[]) {
		setBlendList(list);
		debugger;
	}
	function renderBlendControl() {
		return (
			<div css={styles.container}>
				<BlendList list={blendList} title="test" onChange={onListChange} />
				{showProgress && <CircularProgress css={styles.progress} />}
				<div css={styles.controls}>
					<div css={styles.InputAndButton}>
						<Button
							css={styles.feedButton}
							variant="contained"
							size="large"
							fullWidth
							color="primary"
							onClick={() => {
								onHandleBlend();
							}}
						>
							blend
						</Button>
					</div>
				</div>
			</div>
		);
	}

	function onHandleBlend() {
		setShowProgress(true);
		blenderControls({
			variables: {
				blend: [
					{
						grams: grams,
						nodeId: 1,
					},
				],
			},
		});
	}
	return (
		<div css={styles.container}>
			<Typography css={styles.titleContainer}>v a1.000</Typography>
			<Button
				css={styles.stopButton}
				variant="contained"
				size="large"
				color="error"
				onClick={() => {
					callStopAll();
				}}
			>
				Emergency Stop
			</Button>

			{renderState()}
			{renderControls()}
		</div>
	);
};

export default BlenderControls;
