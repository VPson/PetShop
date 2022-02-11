import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { PetsRepositoryInMemory } from '@modules/pets/repositories/in-memory/PetsRepositoryInMemory';
import { CreatePetUseCase } from '../createPet/CreatePetUseCase';


let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

let petsRepositoryInMemory: PetsRepositoryInMemory;
let createPetUseCase: CreatePetUseCase;


describe('List pets', () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

		petsRepositoryInMemory = new PetsRepositoryInMemory();
		createPetUseCase = new CreatePetUseCase(
			petsRepositoryInMemory,
			usersRepositoryInMemory
		);
	});

	it('should be able to list owne\'s pets', async () => {
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

		const allPets = await petsRepositoryInMemory.listPets(user_id);

		expect(allPets.length).toBe(1);
	});
});