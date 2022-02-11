import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { PetsRepositoryInMemory } from '@modules/pets/repositories/in-memory/PetsRepositoryInMemory';
import { ServicesRepositoryInMemory } from '@modules/pets/repositories/in-memory/ServicesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreatePetUseCase } from '../createPet/CreatePetUseCase';
import { CreateServiceUseCase } from './CreateServiceUseCase';


let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

let petsRepositoryInMemory: PetsRepositoryInMemory;
let createPetUseCase: CreatePetUseCase;

let servicesRepositoryInMemory: ServicesRepositoryInMemory;
let createServiceUseCase: CreateServiceUseCase;


describe('Create Service', () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

		petsRepositoryInMemory = new PetsRepositoryInMemory();
		createPetUseCase = new CreatePetUseCase(
			petsRepositoryInMemory,
			usersRepositoryInMemory
		);
		
		servicesRepositoryInMemory = new ServicesRepositoryInMemory();
		createServiceUseCase = new CreateServiceUseCase(
			servicesRepositoryInMemory,
			petsRepositoryInMemory
		);
	});

	it('should able to create a service', async () => {
		const date = new Date();

		await createUserUseCase.execute({
			name: 'teste1',
			cpf: 'teste1',
			email: 'teste1',
			password: 'teste1',
			contact: 'teste1',
			address: 'teste1'
		});
	
		const allUsers = await usersRepositoryInMemory.list();
		const user_id = allUsers[0].id;
		
		const pet = await createPetUseCase.execute({
			user_id: user_id,
			name: 'pet1',
			birthDate: date,
			species: 'pet1',
			breed: 'pet1',
			gender: 'pet1'
		});

		const service = await createServiceUseCase.execute({
			pet_id: pet.id,
			procedure: 'service1', 
			veterinarian: 'service1',
		});

		expect(service).toHaveProperty('id');

	});

	it('Should not able to create a service with pet not found', async () => {
		await expect(
			createServiceUseCase.execute({
				pet_id: 'fonfon',
				procedure: 'service1', 
				veterinarian: 'service1',
			})
		).rejects.toEqual(new AppError('Pet does not exists!'));
	});

	it('should not able to create a service already exists', async () => {
		const date = new Date();

		await createUserUseCase.execute({
			name: 'teste1',
			cpf: 'teste1',
			email: 'teste1',
			password: 'teste1',
			contact: 'teste1',
			address: 'teste1'
		});

		const allUsers = await usersRepositoryInMemory.list();
		const user_id = allUsers[0].id;
		
		const pet = await createPetUseCase.execute({
			user_id: user_id,
			name: 'pet1',
			birthDate: date,
			species: 'pet1',
			breed: 'pet1',
			gender: 'pet1'
		});

		await createServiceUseCase.execute({
			pet_id: pet.id,
			procedure: 'service1', 
			veterinarian: 'service1',
		});

		await expect(
			createServiceUseCase.execute({
				pet_id: pet.id,
				procedure: 'service1', 
				veterinarian: 'service1',
			})
		).rejects.toEqual(new AppError('Service already exists'));
	});

});