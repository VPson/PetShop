import { CreatePetController } from '@modules/pets/useCases/createPet/CreatePetController';
import { CreateServiceController } from '@modules/pets/useCases/createService/CreateServiceController';
import { Router } from 'express';

const petRoutes = Router();

const createPetController = new CreatePetController();
const createServiceController = new CreateServiceController();

petRoutes.post('/', createPetController.handle);
petRoutes.post('/service/:id', createServiceController.handle);

export { petRoutes };