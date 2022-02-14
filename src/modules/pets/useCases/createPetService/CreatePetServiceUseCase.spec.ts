import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { PetsRepositoryInMemory } from '@modules/pets/repositories/in-memory/PetsRepositoryInMemory';
import { ServicesRepositoryInMemory } from '@modules/pets/repositories/in-memory/ServicesRepositoryInMemory';
import { CreatePetUseCase } from '../createPet/CreatePetUseCase';
import { CreateServiceUseCase } from '../createService/CreateServiceUseCase';
import { CreatePetServiceUseCase } from './CreatePetServiceUseCase';


let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

let petsRepositoryInMemory: PetsRepositoryInMemory;
let createPetUseCase: CreatePetUseCase;

let servicesRepositoryInMemory: ServicesRepositoryInMemory;
let createServiceUseCase: CreateServiceUseCase;

let createPetServiceUseCase: CreatePetServiceUseCase;

describe('Create services of pet', () => {
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

		createPetServiceUseCase = new CreatePetServiceUseCase(
			petsRepositoryInMemory,
			servicesRepositoryInMemory
		);
	});

	it('should able to increment services to pet', async () => {
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
		
		const pet_id = pet.id;
		await createPetServiceUseCase.execute({pet_id});

		expect(pet.services.length).toBe(1);
	});
});