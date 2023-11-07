import mongoose from 'mongoose';

import { 
    DB_HOST, 
    DB_USERNAME, 
    DB_PASSWORD,
	DB_NAME,
	PRODUCTION
} from '../../config';
import { logger } from '../../loggers';
import cars from './cars';

const dbService = {
	
	/**
	 * Connect to the mongodb database
	 *
	 * @returns {object} - Mongodb client object 
	 */
	async connect () {
		let client = null;

		try {
			const dbUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

			mongoose.set('strictQuery', true);
			mongoose.set('debug', PRODUCTION ? false : true);

			client = await mongoose.connect(dbUrl,  { serverSelectionTimeoutMS: 5000 });

			logger.info('The database is now connected');
		} catch (error) {
			logger.error('Error at services/database/index#connect: %o', error);
		}

		return client;
	},
	cars
};

export default dbService;
