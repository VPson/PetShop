import { CreatePetController } from '@modules/pets/useCases/createPet/CreatePetController';
import { Router } from 'express';

const petRoutes = Router();

const createPetController = new CreatePetController();

petRoutes.post('/', createPetController.handle);

export { petRoutes };