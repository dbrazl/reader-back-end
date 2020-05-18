import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RestoreController from './app/controllers/RestoreController';
import AvatarController from './app/controllers/AvatarController';
import PageController from './app/controllers/PageController';

// Middlewares
import AuthMiddleware from './app/middlewares/auth';

import ValidateUserStore from './app/middlewares/validators/UserStore';
import ValidateUserUpdate from './app/middlewares/validators/UserUpdate';
import ValidateSessionStore from './app/middlewares/validators/SessionStore';
import ValidateRestoreUpdate from './app/middlewares/validators/RestoreUpdate';
import ValidatePageIndexOne from './app/middlewares/validators/PageIndeOne';

const routes = new Router();
const upload = multer(multerConfig);

// Sign routes
routes.post('/users', ValidateUserStore, UserController.store);
routes.post('/session', ValidateSessionStore, SessionController.store);
routes.put('/restore', ValidateRestoreUpdate, RestoreController.update);
routes.get('/page', ValidatePageIndexOne, PageController.indexOne);

routes.use(AuthMiddleware);

// User routes
routes.put('/users', ValidateUserUpdate, UserController.update);
routes.delete('/users', UserController.delete);

routes.post('/avatar', upload.single('file'), AvatarController.store);
routes.delete('/avatar/:path', AvatarController.delete);

export default routes;
