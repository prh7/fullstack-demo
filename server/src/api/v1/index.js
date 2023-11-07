import express from 'express';

import Cars from './cars';

const router = express.Router();

router.use('/cars', Cars);

router.get('/*', (request, response) => response.status(404).json({ message: 'Invalid endpoint' }));
router.post('/*', (request, response) => response.status(404).json({ message: 'Invalid endpoint' }));
router.delete('/*', (request, response) => response.status(404).json({ message: 'Invalid endpoint' }));

export default router;
