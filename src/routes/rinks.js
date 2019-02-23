import express from 'express';
import { rinksController } from '../controllers';

const router = express.Router();
router.route('/').get(rinksController.getAllRinks);
router.route('/:rink').get(rinksController.getRinkInfo);

export const client = { router, path: '' };