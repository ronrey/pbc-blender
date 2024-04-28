/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from '@mui/material';
import { styles } from './styles';
import { useMutation, gql } from '@apollo/client';
import { Module } from './module';
import { MenuBar } from '../menuBar';
interface Props {}
export interface BlendItem {
	coffeeId: number;
	grams: number;
}
export const Modules: React.FC<Props> = () => {
	const STOP = gql`
		mutation Stop {
			stop {
				code
				success
				message
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

	function renderModules() {
		const mods = [];
		for (let index = 0; index < 6; index++) {
			mods.push(<Module index={index} key={index} />);
		}
		return <div css={styles.moduleContainer}>{mods}</div>;
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
			{renderModules()}
		</div>
	);
};
export default Modules;
