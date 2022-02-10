import { Service } from '@modules/pets/infra/typeorm/entities/services';
import { IServicesRepository } from '@modules/pets/repositories/IServicesRepository';

interface IRequest {
	pet_id: string
	procedure: string
	veterinarian: string
	image?: string
}

// @injectable()
class CreateServiceUseCase {
	// @inject('ServicesRepository')
	constructor(
		private servicesRepository: IServicesRepository
	){}

	async execute({
		pet_id,
		procedure,
		veterinarian,
		image
	}: IRequest): Promise<Service>{
		const service = await this.servicesRepository.create({
			pet_id,
			procedure,
			veterinarian,
			image
		});

		return service;
	}
}

export { CreateServiceUseCase };