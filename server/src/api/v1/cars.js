import { Router } from 'express';

import carsController from '../../controllers/cars';

const router = Router();

router.post('/', carsController.createCar);

router.put('/:carId', carsController.updateCar);

router.delete('/:carId', carsController.deleteCar);

router.get('/', carsController.getCars);

export default router;
