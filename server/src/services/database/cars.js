import { db } from '../../helpers';
import { logger } from '../../loggers';
import { carModel } from '../../models';

const cars = {
    async addCar (carObj) {
        let result = {};

        try {
            logger.debug('Inserting a new car into the database -> initiated');
            
            const doc = new carModel(carObj);
            const car = await doc.save();

            logger.debug('Inserting a new car into the database -> successful');

            result.success = true;
            result.message = 'The car is successfully created';
            result.data = car;
        } catch (error) {
            logger.debug('Inserting a new car into the database -> failure');

            result.success = false;
			result.message = 'Failure in adding the car';
			result.data = null;

            logger.error('Error at /services/database/cars#addCar: %o', error);
        }

        return result;
    },

    async findCars () {
        let result = {};

        try {
            logger.debug('Looking up for cars based in the database -> started');
    
            const cars = await carModel.find({}, { _id: 0 });

            logger.debug('Looking up for cars in the database -> finished');

            result.success = true;
			result.message = cars.length > 0 ? 'The cars are successfully fetched' : 'No cars are available';
			result.data = cars;
        } catch (error) {
            logger.debug('Looking up for cars in the database -> failure');

            result.success = false;
			result.message = 'Failure in fetching cars';
			result.data = null;

            logger.error('Error at /services/database/cars#findCars: %o', error);
        }

        return result;
    },

    async findCar (query) {
        let result = {};

        try {
            logger.debug('Looking up for a car in the database -> started');
    
            const car = await carModel.findOne(query, { _id: 0 }).lean();

            logger.debug('Looking up for a car in the database -> finished');

            result.success = true;
			result.message = car ? 'The car is successfully fetched' : 'No such car found';
			result.data = car;
        } catch (error) {
            logger.debug('Looking up for a car in the database -> failure');

            result.success = false;
			result.message = 'Failure in fetching the car';
			result.data = null;

            logger.error('Error at /services/database/cars#findCar: %o', error);
        }

        return result;
    },

    async updateCar (carObj) {
        let result = {};
        const { carId, fieldsToUpdate } = carObj;

        try {
            logger.debug('Looking up and updating a car record in the database -> initiated');

            const orQuery = db.buildOrQuery(fieldsToUpdate);
            const checkLen = Object.keys(fieldsToUpdate).length > 0;
            const car = await carModel.findOneAndUpdate(
                { 
                    carId,
                    ...(checkLen && { $or: orQuery })
                }, 
                { 
                    $set: { ...fieldsToUpdate }
                },
                { 
                    projection: {
                        _id: 0,
                        isDeleted: 0,
                        createdAt: 0
                    }, 
                    new: true
                }
            ).lean();

            logger.debug('Looking up and updating a car record in the database -> successful');

            result.success = true;
            result.message = car ? 'The car is successfully updated' : 'Nothing to update';
            result.data = car;
        } catch (error) {
            logger.debug('Looking up and updating a car record in the database -> failure');

            result.success = false;
			result.message = 'Failure to update the car';
			result.data = null;

            logger.error('Error at /services/database/cars#updateCar: %o', error);
        }

        return result;
    },

    async deleteCar (query) {
        let result = {};

        try {
            logger.debug('Deleting a car from the database -> initiated');
            
            const car = await carModel.deleteOne(query);

            logger.debug('Deleting a car from the database -> successful');

            result.success = true;
            result.message = 'The car is successfully deleted';
            result.data = car;
        } catch (error) {
            logger.debug('Deleting a car from the database -> failure');

            result.success = false;
			result.message = 'Failure in deleting the car';
			result.data = null;

            logger.error('Error at /services/database/cars#deleteCar: %o', error);
        }

        return result;
    }
};

export default cars;
