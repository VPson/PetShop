import { PetsRepositoryInMemory } from '@modules/pets/repositories/in-memory/PetsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreatePetUseCase } from './CreatePetUseCase';

let petsRepositoryInMemory: PetsRepositoryInMemory;
let	createPetUseCase: CreatePetUseCase;

describe('Create Pet', () => {
	beforeEach(() => {
		petsRepositoryInMemory = new PetsRepositoryInMemory();
		createPetUseCase = new CreatePetUseCase(petsRepositoryInMemory);
	});

	it('should be able to create a pet', async () => {
		const date = new Date();
		
		const pet = await createPetUseCase.execute({
			user_id: 'pet1',
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

		await createPetUseCase.execute({
			user_id: 'pet1',
			name: 'pet1',
			birthDate: date,
			species: 'pet1',
			breed: 'pet1',
			gender: 'pet1'
		});
		await expect(
			createPetUseCase.execute({
				user_id: 'pet1',
				name: 'pet1',
				birthDate: date,
				species: 'pet1',
				breed: 'pet1',
				gender: 'pet1'
			})
		).rejects.toBeInstanceOf(AppError);
		
	});
});