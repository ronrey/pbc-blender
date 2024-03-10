/** @jsxImportSource @emotion/react */
// src/Counter.tsx
import React, { useState } from 'react';
import { Button, CircularProgress, Input } from '@mui/material';
import { Typography } from '@mui/material';
import { styles } from './styles';
import { useMutation, gql } from '@apollo/client';
import BlendList from '../BlendList';
interface Props {}
export interface BlendItem {
	coffeeId: number;
	grams: number;
}
const blendListProto = [{ coffeeId: 0, grams: 0 }];
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
	const [showProgress, setShowProgress] = useState(false);
	const [blendList, setBlendList] = useState(blendListProto);
	const [blend] = useMutation(BLEND, {
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
		return <div css={styles.stateContainer}></div>;
	}
	function renderControls() {
		return <div css={styles.controlContainer}>{renderBlendControl()}</div>;
	}
	function onListChange(list: BlendItem[]) {
		setBlendList(list);
	}
	function renderBlendControl() {
		return (
			<div css={styles.container}>
				<BlendList list={blendList} title="Blend" onChange={onListChange} />
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
		// const newBlend = blendList.map((item, i) => {
		// 	return { "coffeeId":item.coffeeId, "grams":item.grams };
		// });
		const newBlend = blendList.map((item, i) => ({
			coffeeId: item.coffeeId,
			grams: item.grams,
		}));
		blend({
			variables: {
				blend: newBlend,
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
