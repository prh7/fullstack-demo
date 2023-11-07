import { createLogger, transports, format } from 'winston';
import 'winston-mongodb';

import { 
    PRODUCTION, 
    DB_USERNAME, 
    DB_PASSWORD, 
    DB_HOST, 
    DB_PORT, 
    DB_NAME 
} from '../config';

const { combine, printf, timestamp, label, json, splat, colorize } = format;

const dbUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const customLog = printf((info) => {
    return `${info.timestamp} [${info.label}] ${info.level} -> ${info.message}`;
});

const options = {
    info: {
        level: 'info',
        dirname: 'logs',
        json: true,
        handleExceptions: false,
        filename: 'combined.log' // If required, it can be extended to fit winston-daily-rotation-file in the future
    }, 
    db: {
        level: 'error',
        db: dbUri,
        options: { useUnifiedTopology: true },
        collection: 'logs',
        decolorize: true
    },
    error: {
        level: 'error',
        dirname: 'logs',
        json: true,
        handleExceptions: true,
        filename: 'error.log' // If required, it can be extended to fit winston-daily-rotation-file in the future
    },
    console: {
        level: PRODUCTION ? 'info' : 'debug',
        json: false,
        handleExceptions: true
    }
};

const logger = createLogger({
    format: combine(label({ label: 'Car Management System Backend' }), colorize(), splat(), json(), timestamp(), customLog),
    transports: [
        new transports.File(options.info),
        new transports.File(options.error),
        ... PRODUCTION ? [new transports.MongoDB(options.db)] : [],
        new transports.Console(options.console)
    ],
    exitOnError: false
});
  
export default logger;
