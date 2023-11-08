import { v4 as uuidv4 } from 'uuid';
import { InternalServerError } from '../errors'
import dbService from '../services/database';
import { logger } from '../loggers';

const cars = {
    async createCar (request, response, next) {
        try {
            const { body } = request;
            const carId = `car-${uuidv4()}`;
            const carObj = { carId, ...body };
            const createdCar = await dbService.cars.addCar(carObj);

            if (!createdCar.success) {
                throw new InternalServerError(createdCar.message);
            }

            const { _id, ...otherProps } = createdCar.data.toObject();

            response.json({
                success: createdCar.success,
                message: createdCar.message,
                car: otherProps
            });
        } catch (error) {
            logger.error('Error at /controllers/cars#createCar: %o', error);

            next(error);
        }
    },

    async updateCar (request, response, next) {
        try {
            const { body, params } = request;
            const { carId } = params;

            const carFound = await dbService.cars.findCar({ carId });
            
            if (!carFound.data) {
                return response.json({
                    success: carFound.success,
                    message: carFound.message,
                    car: { carId }
                });
            }

            const fieldsToUpdate = { ...body };
            const updatedCar = await dbService.cars.updateCar({ carId, fieldsToUpdate });

            if (!updatedCar.success) {
                throw new InternalServerError(updatedCar.message);
            }
            
            response.json({ 
                success: updatedCar.success, 
                message: updatedCar.message,
                car: updatedCar.data
            });
        } catch (error) {
            logger.error('Error at /controllers/cars#updateCar: %o', error);

            next(error);
        }
    },

    async getCars (request, response, next) {
        try {
            let cars = await dbService.cars.findCars();

            if (!cars.success) {
                throw new InternalServerError(cars.message);
            }

            response.json({
                success: cars.success,
                message: cars.message,
                cars: cars.data
            });
        } catch (error) {
            logger.error('Error at /controllers/cars#getCars: %o', error);

            next(error);   
        }
    },

    async deleteCar (request, response, next) {
        try {
            const { params } = request;
            const { carId } = params;

            const carFound = await dbService.cars.findCar({ carId });
            
            if (!carFound.data) {
                return response.json({
                    success: carFound.success,
                    message: carFound.message,
                    car: { carId }
                });
            }

            const deletedCar = await dbService.cars.deleteCar({ carId });

            if (!deletedCar.success) {
                throw new InternalServerError(deletedCar.message);
            }
            
            response.json({ 
                success: deletedCar.success, 
                message: deletedCar.message,
                car: { carId }
            });
        } catch (error) {
            logger.error('Error at /controllers/cars#deleteCar: %o', error);

            next(error);
        }
    }
};

export default cars;
