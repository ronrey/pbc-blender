import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import logger from './winston';
const app = express(); // Initialize an Express application
app.use(cookieParser()); // Use cookie-parser middleware
app.use(express.static(path.join(__dirname, 'client'))); // Serve static files from the 'client' directory
async function startServer() {
	app.get('*', (req, res) => {
		// Define a catch-all route that serves React application's HTML file.
		res.sendFile(path.join(__dirname, 'client', 'index.html'));
	});
	const PORT = 8081; // Start the Express server
	app.listen(PORT, () => logger.info(`🚀 Server ready at http://localhost:${PORT}`));
}
startServer();
