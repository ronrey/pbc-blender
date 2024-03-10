import winston from 'winston';
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(({ timestamp, level, message }) => {
			return `${timestamp} ${level}: ${message}`;
		})
	),
	transports: [
		// new Winston.transports.File({ filename: 'error.log', level: 'error' }),
		//  new winston.transports.File({ filename: "index.log" }),
		new winston.transports.Console(),
	],
});
if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
		})
	);
}

export default logger;
