import dotenv from 'dotenv';

dotenv.config();

const config = {
	PRODUCTION: JSON.parse(process.env.PRODUCTION),
	ENVIRONMENT: process.env.ENVIRONMENT,
	PORT: process.env.PORT,

	DB_HOST: process.env.DB_HOST,
	DB_USERNAME: process.env.DB_USERNAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME
};

export const {
	PRODUCTION,
	ENVIRONMENT,
	PORT,

	DB_HOST,
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME
} = config;
