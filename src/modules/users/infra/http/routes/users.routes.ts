import { Router, Request } from 'express';
import { celebrate, Segments, Joi } from 'celebrate'
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAutheticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController'

const usersRouters = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);


usersRouters.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), usersController.create)

usersRouters.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default usersRouters;
