import { CreatePetController } from '@modules/pets/useCases/createPet/CreatePetController';
import { CreateServiceController } from '@modules/pets/useCases/createService/CreateServiceController';
import { ListPetController } from '@modules/pets/useCases/listPet/ListPetController';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';

const petRoutes = Router();

const createPetController = new CreatePetController();
const createServiceController = new CreateServiceController();
const listPetController = new ListPetController();

petRoutes.get('/', ensureAuthenticated, listPetController.handle);
petRoutes.post('/create', createPetController.handle);
petRoutes.post('/service/:id', createServiceController.handle);

export { petRoutes };