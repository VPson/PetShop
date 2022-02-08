import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { petRoutes } from './pet.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/pet', petRoutes);
routes.use(authenticateRoutes);

export { routes };