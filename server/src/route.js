import Router from 'express';
import Controller from './controller.js';

const router = new Router();

router.post('/register', Controller.register);
router.post('/auth', Controller.auth);

export default router;