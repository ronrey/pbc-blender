/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { Button, Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { styles } from './styles';
import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { Station } from './station';
interface Props {
	index: number;
}
export const Module: React.FC<Props> = ({ index }) => {
	const STOP_MODULE = gql`
		mutation StopModule {
			stopModule(index: ${index}) {
				code
				message
				success
			}
		}
	`;
	const GET_SERVER_NAME = gql`
		query getServerName{
			getServerName(index: ${index})
		}
	`;
	const [serverName, setServerName] = useState('');
	const [getServerName] = useLazyQuery(GET_SERVER_NAME, {
		fetchPolicy: 'cache-and-network',
		onCompleted: data => {
			setServerName(data.getServerName);
		},

		onError: err => {
			debugger;
		},
	});
	const [stopModule] = useMutation(STOP_MODULE, {
		onCompleted(data) {
			console.log(`stopped, data:${data}`);
		},
		onError: err => {
			debugger;
		},
	});
	useEffect(() => {
		getServerName();
	}, [getServerName, index]);
	function callStop() {
		console.log(`stopping module ${index}`);
		stopModule();
	}
	function renderStations() {
		return (
			<Paper elevation={4} css={styles.stateContainer}>
				<Station index={index} nodeId={0} />
				<Station index={index} nodeId={1} />
				<Station index={index} nodeId={2} />
			</Paper>
		);
	}
	return (
		<Paper elevation={4} css={styles.container}>
			<Typography css={styles.title}>{serverName}</Typography>
			<Button
				css={styles.stopButton}
				variant="contained"
				size="small"
				color="error"
				onClick={() => {
					callStop();
				}}
			>
				Stop
			</Button>

			{renderStations()}
		</Paper>
	);
};
export default Module;
