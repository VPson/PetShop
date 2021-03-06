import { Pet } from '@modules/pets/infra/typeorm/entities/pets';
import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';
import { IServicesRepository } from '@modules/pets/repositories/IServicesRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	pet_id: string
}

@injectable()
class CreatePetServiceUseCase {
	constructor(
		@inject('PetsRepository')
		private petsRepository: IPetsRepository,
		
		@inject('ServicesRepository')
		private servicesRepository: IServicesRepository
	){}

	async execute({pet_id}: IRequest):Promise<Pet>{
		const petExists = await this.petsRepository.findById(pet_id);

		if(!petExists){
			throw new AppError('Pet does not exists');
		}

		const services = await this.servicesRepository.findByPetId(pet_id);
		
		petExists.services = services;

		await this.petsRepository.create(petExists);

		return petExists;

	}

}

export { CreatePetServiceUseCase };