import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, blue, brown, red, green } from '@mui/material/colors';
import useConfig from './components/hooks/useConfig';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
	const auth_token = localStorage.getItem('auth_token');
	return {
		headers: {
			...headers,
			authorization: auth_token ? `Bearer ${auth_token}` : '',
		},
	};
});
const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#0c80bc',
			light: blue[100],
			dark: 'black',
			contrastText: grey[50],
		},
		secondary: {
			main: green[800],
			light: green[800],
			dark: grey[800],
			contrastText: grey[50],
		},
		background: {
			default: grey[800],
			paper: grey[800], // Dark background color for paper surfaces
		},
		text: {
			primary: grey[100],
			secondary: grey[100],
		},
		error: {
			main: red[900],
			light: red[900],
			//   dark: red[900],
			contrastText: grey[50],
		},
		common: {
			black: grey[900],
			white: grey[50],
		},
	},
	// components: {
	// 	MuiPaper: {
	// 		styleOverrides: {
	// 			root: {
	// 				//	padding: '16px',
	// 				//	backgroundColor: '#1e1e1e',
	// 				//	borderRadius: '8px',
	// 				//	boxShadow: `0px 2px 4px ${grey[600]}`,
	// 			},
	// 		},
	// 	},
	// },
	typography: {
		fontFamily: ['SFRegular'].join(','),
	},
});

if (localStorage.getItem('auth_token')) {
	localStorage.removeItem('auth_token');
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function RootApp() {
	const { config, isLoading, error } = useConfig();
	const httpLink = createHttpLink({
		uri: config.serverURL,
	});
	console.log(`config.serverURL: ${config.serverURL}`);
	const client = new ApolloClient({
		link: authLink.concat(httpLink),
		uri: config.serverURL,
		cache: new InMemoryCache(),
	});
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<React.StrictMode>
			<Router>
				<ThemeProvider theme={theme}>
					<ApolloProvider client={client}>
						<App />
					</ApolloProvider>
				</ThemeProvider>
			</Router>
		</React.StrictMode>
	);
}
root.render(<RootApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
