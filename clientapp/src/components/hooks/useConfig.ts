import { useState, useEffect } from 'react';

// Custom hook to fetch configuration data

export interface config {
	config: { serverName: string; serverURL: string };
	isLoading: boolean;
	error: any;
}
function useConfig(): config {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [serverName, setServerName] = useState('');
	const [serverURL, setServerURL] = useState('');

	useEffect(() => {
		fetch('/config.json')
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to fetch configuration');
				}
				return response.json();
			})
			.then(data => {
				debugger;
				setServerName(data.serverName);
				setServerURL(`http://${data.serverName}:1768`);
				//	setServerURL(`http://localhost:1768`);
			})
			.catch(error => {
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	});

	return { config: { serverName, serverURL }, isLoading, error };
}

export default useConfig;
