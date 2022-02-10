import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { PetsRepository } from '@modules/pets/infra/typeorm/repositories/PetsRepository';
import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';

import { IServicesRepository } from '@modules/pets/repositories/IServicesRepository';
import { ServicesRepository } from '@modules/pets/infra/typeorm/repositories/ServicesRepository';

import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
	'UsersRepository', 
	UsersRepository
);

container.registerSingleton<IPetsRepository>(
	'PetsRepository',
	PetsRepository
);

container.registerSingleton<IServicesRepository>(
	'ServicesRepository',
	ServicesRepository
);