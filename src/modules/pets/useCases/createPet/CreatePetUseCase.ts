import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Pet } from '@modules/pets/infra/typeorm/entities/pets';
import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	user_id: string
	name: string
	birthDate: Date
	species: string
	breed: string
	gender: string
}

@injectable()
class CreatePetUseCase {
	constructor(
		@inject('PetsRepository')
		private petsRepository: IPetsRepository,

		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	){}

	async execute({
		user_id,
		name,
		birthDate,
		species,
		breed,
		gender
	}:IRequest): Promise<Pet>{
		const owner = await this.usersRepository.findById(user_id);

		if(!owner){
			throw new AppError('Owner does not exists');
		}

		const petAlreadyExists = await this.petsRepository.findPet({
			user_id,
			name,
			birthDate,
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
			birthDate,
			species,
			breed,
			gender
		});

		
		return pet;
	}
}

export { CreatePetUseCase };