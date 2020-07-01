import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import UserController from './controllers/usersController';
import AuthController from './controllers/authController';

import authentication from './middlewares/auth';

const routes = Router();

const usersController = new UserController();
const authController = new AuthController();

routes.get('/users', authentication, usersController.getAll);
routes.get('/users/:id', authentication, usersController.get);
routes.get('/users/getByUserName/:username', authentication, usersController.getByUserName);
routes.post('/users/recoverPassword', usersController.recoverPassword);
routes.post(
    '/users',
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required(),
            taxId: Joi.string().required()
        })
    }, { abortEarly: false }),
    usersController.create);

routes.post(
    '/auth',
    celebrate({
        body: Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required()
        })
    }, { abortEarly: false }),
    authController.index);

export default routes;