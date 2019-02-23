import express from 'express';
import { rinksController } from '../controllers';

const router = express.Router();
router.route('/rinks').get(rinksController.getAllRinks);
router.route('/rinks/:rink').get(rinksController.getRinkInfo);
router.route('/rinks/:rink').post(rinksController.postRinkInfo);

export const rinks = { router, path: '' };