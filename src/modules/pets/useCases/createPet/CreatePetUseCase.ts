import { Pet } from '@modules/pets/infra/typeorm/entities/pets';
import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
	user_id: string
	name: string
	bithDate: Date
	species: string
	breed: string
	gender: string
}

class CreatePetUseCase {
	constructor(
		private petsRepository: IPetsRepository,
	){}

	async execute({
		user_id,
		name,
		bithDate,
		species,
		breed,
		gender
	}:IRequest): Promise<Pet>{
		const petAlreadyExists = await this.petsRepository.findPet({
			user_id,
			name,
			bithDate,
			species,
			breed,
			gender
		});

		if(petAlreadyExists && petAlreadyExists.user_id === user_id) {
			throw new AppError('This pet already exists!');
		}

		const pet = await this.petsRepository.create({
			user_id,
			name,
			bithDate,
			species,
			breed,
			gender
		});

		
		return pet;
	}
}

export { CreatePetUseCase };