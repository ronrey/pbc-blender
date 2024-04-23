/** @jsxImportSource @emotion/react */
// src/Counter.tsx
import React, { useState } from 'react';
import { Button, CircularProgress, Input } from '@mui/material';
import { styles } from './styles';
import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { apolloClients } from '../apollo-client';
import { Module } from './module';
import { MenuBar } from '../menuBar';
interface Props {}
export interface BlendItem {
	coffeeId: number;
	grams: number;
}
const blendListProto = [{ coffeeId: 0, grams: 0 }];
export const Modules: React.FC<Props> = () => {
	const STOP = gql`
		mutation stopAll {
			stopAll {
				code
			}
		}
	`;

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

	function renderModules() {
		console.log('renderModules', apolloClients);
		const mods = [];
		for (let index = 0; index < 5; index++) {
			mods.push(<Module moduleId={index} />);
		}

		return (
			<div css={styles.container}>
				<div css={styles.controlContainer}>{mods}</div>
			</div>
		);
	}
	return (
		<div css={styles.container}>
			<MenuBar dept="modules" />
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
			{renderModules()}
		</div>
	);
};
export default Modules;
