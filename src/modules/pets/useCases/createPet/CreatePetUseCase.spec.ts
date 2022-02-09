import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { PetsRepositoryInMemory } from '@modules/pets/repositories/in-memory/PetsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreatePetUseCase } from './CreatePetUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

let petsRepositoryInMemory: PetsRepositoryInMemory;
let	createPetUseCase: CreatePetUseCase;

describe('Create Pet',() => {
	beforeEach(async () => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

		petsRepositoryInMemory = new PetsRepositoryInMemory();
		createPetUseCase = new CreatePetUseCase(
			petsRepositoryInMemory,
			usersRepositoryInMemory);
	});

	it('should be able to create a pet', async () => {
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
		
		expect(pet).toHaveProperty('id');
	});

	it('should not able to create a pet already exists', async () => {
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

		await createPetUseCase.execute({
			user_id: user_id,
			name: 'pet1',
			birthDate: date,
			species: 'pet1',
			breed: 'pet1',
			gender: 'pet1'
		});
		await expect(
			createPetUseCase.execute({
				user_id: user_id,
				name: 'pet1',
				birthDate: date,
				species: 'pet1',
				breed: 'pet1',
				gender: 'pet1'
			})
		).rejects.toBeInstanceOf(AppError);
		
	});
});