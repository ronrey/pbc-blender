/** @jsxImportSource @emotion/react */
// src/Counter.tsx
import React, { useCallback, useState, useEffect } from 'react';
import { Button, CircularProgress, Input, Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { styles } from './styles';
import { useMutation, gql, ApolloClient, useLazyQuery } from '@apollo/client';
import { Station } from './station';

interface Props {
	moduleId: number;
}
const REFRESH_RATE = 1000;

export const Module: React.FC<Props> = ({ moduleId }) => {
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

	const [showProgress, setShowProgress] = useState(false);
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
		getServerName({ variables: { index: moduleId } });
	}, [getServerName, moduleId]);

	function callStop() {
		console.log('callStop');
		stop();
	}

	function renderState() {
		return (
			<Paper elevation={4} css={styles.stateContainer}>
				<Station moduleId={moduleId} nodeId={0} />
				<Station moduleId={moduleId} nodeId={1} />
				<Station moduleId={moduleId} nodeId={2} />
			</Paper>
		);
	}
	function renderControls() {
		//return <div css={styles.controlContainer}>{renderBlendControl()}</div>;
		return null;
	}

	return (
		<div css={styles.container}>
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

			{renderState()}
			{renderControls()}
		</div>
	);
};
export default Module;
