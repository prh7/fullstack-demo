import morgan from 'morgan';
import json from 'morgan-json';
import Bowser from "bowser"; 

import logger from './logger';

const format = json({
	method: ':method',
	url: ':url',
	status: ':status',
	contentLength: ':res[content-length]',
	totalTime: ':total-time',
	userAgent: ':user-agent'
});

const httpLogger = morgan(format, {
	stream: {
		write: (message) => {
			const { method, url, status, contentLength, userAgent } = JSON.parse(message);
			const browser = Bowser.getParser(userAgent);

			logger.info(`API Endpoint=${method} ${url} StatusCode=${Number(status)} ContentLength=${contentLength} OS=${browser.getOSName()} Platform=${browser.getPlatformType()} Browser=${browser.getBrowserName()} ${browser.getBrowserVersion()}`);
		}
	}
});

export default httpLogger;
