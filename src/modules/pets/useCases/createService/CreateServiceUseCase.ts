import { Service } from '@modules/pets/infra/typeorm/entities/services';
import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';
import { IServicesRepository } from '@modules/pets/repositories/IServicesRepository';
import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
	pet_id: string
	procedure: string
	veterinarian: string
	description?: string
	image?: string
}

@injectable()
class CreateServiceUseCase {
	constructor(
		@inject('ServicesRepository')
		private servicesRepository: IServicesRepository,

		@inject('PetsRepository')
		private petsRepository: IPetsRepository
	){}

	async execute({
		pet_id,
		procedure,
		veterinarian,
		description,
		image
	}: IRequest): Promise<Service>{
		const pet = await this.petsRepository.findById(pet_id);

		if(!pet){
			throw new AppError('Pet does not exists!');
		}

		const serviceAlreadyExists = await this.servicesRepository.findService({
			pet_id, 
			procedure, 
			veterinarian, 
			description});

		if(serviceAlreadyExists){
			throw new AppError('Service already exists');
		}

		const service = await this.servicesRepository.create({
			pet_id,
			procedure,
			veterinarian,
			description,
			image
		});

		return service;
	}
}

export { CreateServiceUseCase };