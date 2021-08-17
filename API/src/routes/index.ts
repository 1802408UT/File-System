import { Router } from 'express';
import auth from './auth';
import user from './user';
import items from './items';
import report from './report';
import upload from './upload';


const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/items', items);
routes.use('/report', report);
routes.use('/upload', upload);

export default routes;
