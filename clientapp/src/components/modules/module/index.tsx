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
	const STOP = gql`
		mutation stopAll {
			stopAll {
				code
			}
		}
	`;
	const GET_SERVER_NAME = gql`
		query getServerName($index: Int) {
			getServerName(index: $index)
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
	const [stop] = useMutation(STOP, {
		onCompleted(data) {
			console.log(`stopped, data:${data}`);
		},
		onError: err => {
			debugger;
		},
	});
	useEffect(() => {
		getServerName({ variables: { index: index } });
	}, [getServerName, index]);
	function callStop() {
		console.log('callStop');
		stop();
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
