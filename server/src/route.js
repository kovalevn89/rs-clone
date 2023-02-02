import Router from 'express';
import Controller from './controller.js';
import { check } from 'express-validator'; 

const router = new Router();

router.post('/register', [
  check('username', 'invalid username length').isLength({min: 3, max: 12}),
  check('password', 'invalid password length').isLength({min: 3, max: 12}),
], Controller.register);
router.post('/auth', Controller.auth);
router.delete('/user', Controller.deleteUser);
router.put('/user', Controller.updateUserTest);
router.get('/test', Controller.randomTest);

export default router;