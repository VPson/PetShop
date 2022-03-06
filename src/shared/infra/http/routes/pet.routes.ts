import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreatePetController } from '@modules/pets/useCases/createPet/CreatePetController';
import { CreateServiceController } from '@modules/pets/useCases/createService/CreateServiceController';
import { CreatePetServiceController } from '@modules/pets/useCases/createPetService/CreatePetServiceController';
import { ListPetController } from '@modules/pets/useCases/listPet/ListPetController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import { UploadImageServiceController } from '@modules/pets/useCases/imageService/UploadImageServiceController';

const petRoutes = Router();

const imageService = multer(uploadConfig.upload('./tmp'));

const createPetController = new CreatePetController();
const createServiceController = new CreateServiceController();
const listPetController = new ListPetController();
const createPetServiceController = new CreatePetServiceController();
const uploadImageServiceController = new UploadImageServiceController();

petRoutes.get('/', ensureAuthenticated, listPetController.handle);
petRoutes.post('/create', createPetController.handle);
petRoutes.post('/service/create/:id', createServiceController.handle);
petRoutes.post('/service/:id', createPetServiceController.handle);

petRoutes.patch('/imageService', imageService.single('image'), uploadImageServiceController.handle);

export { petRoutes };