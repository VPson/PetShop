import { CreatePetController } from '@modules/pets/useCases/createPet/CreatePetController';
import { CreateServiceController } from '@modules/pets/useCases/createService/CreateServiceController';
import { CreatePetServiceController } from '@modules/pets/useCases/createPetService/CreatePetServiceController';
import { ListPetController } from '@modules/pets/useCases/listPet/ListPetController';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';

const petRoutes = Router();

const createPetController = new CreatePetController();
const createServiceController = new CreateServiceController();
const listPetController = new ListPetController();
const createPetServiceController = new CreatePetServiceController();

petRoutes.get('/', ensureAuthenticated, listPetController.handle);
petRoutes.post('/create', createPetController.handle);
petRoutes.post('/service/create/:id', createServiceController.handle);
petRoutes.post('/service/:id', createPetServiceController.handle);

export { petRoutes };