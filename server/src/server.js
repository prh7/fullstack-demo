import '@babel/polyfill';

import express from 'express';
import cors from 'cors';

import api from './api';
import { PORT } from './config';
import { errorHandlerMiddleware } from './middlewares';
import { logger, httpLogger } from './loggers';
import { dbService } from './services';

const app = express();

app.use(httpLogger);

app.use(cors({ credentials: true, origin: true }));
  
app.set('trust proxy', 1); // trust first proxy

app.use(api);

app.use(errorHandlerMiddleware);

const server = {

	async init () {
		await dbService.connect();
		
		app.listen(PORT, () => logger.info(`The server is running on port ${PORT}`));
	}

};

server.init();
