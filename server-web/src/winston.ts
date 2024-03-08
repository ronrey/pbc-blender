// import winston from 'winston';
// const logger = winston.createLogger({
// 	level: 'info',
// 	format: winston.format.combine(
// 		winston.format.timestamp(),
// 		winston.format.printf(({ timestamp, level, message }) => {
// 			return `${timestamp} ${level}: ${message}`;
// 		})
// 	),
// 	transports: [
// 		// new Winston.transports.File({ filename: 'error.log', level: 'error' }),
// 		//  new winston.transports.File({ filename: "index.log" }),
// 	],
// });
// if (process.env.NODE_ENV !== 'production') {
// 	logger.add(
// 		new winston.transports.Console({
// 			format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
// 		})
// 	);
// }

// export default logger;

import winston, { format, transports, createLogger } from 'winston';
const { combine, timestamp, label, prettyPrint, colorize, printf, align } = format;
const logger = createLogger({
	level: 'info',
	format: winston.format.combine(
		timestamp({
			format: 'MM-DD-YYYY hh:mm:ss',
		}),
		winston.format.printf(({ timestamp, level, message }) => {
			return `${timestamp} ${level}: ${message}`;
		})
	),
	transports: [
		// new Winston.transports.File({ filename: 'error.log', level: 'error' }),
		//  new winston.transports.File({ filename: "index.log" }),
	],
});
if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				colorize({ all: true }),
				timestamp({
					format: 'MM-DD-YYYY hh:mm:ss',
				})
			),
		})
	);
}

export default logger;
