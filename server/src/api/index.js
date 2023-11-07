import express from 'express';
import v1 from './v1';

const router = express.Router();

router.use(express.urlencoded({ extended: true, limit: '5mb' }));
router.use(express.json());

router.use('/v1', v1);

export default router;
