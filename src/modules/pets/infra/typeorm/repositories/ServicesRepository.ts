import { ICreateServiceDTO } from '@modules/pets/dtos/ICreateServiceDTO';
import { IServicesRepository } from '@modules/pets/repositories/IServicesRepository';
import { getRepository, Repository } from 'typeorm';
import { Service } from '../entities/services';

class ServicesRepository implements IServicesRepository {
	private repository: Repository<Service>
	constructor(){
		this.repository = getRepository(Service);
	}

	async findService({
		pet_id,
		procedure,
		veterinarian,
		description,
	}: ICreateServiceDTO): Promise<Service> {
		const service = await this.repository.findOne({		
			pet_id,
			procedure,
			veterinarian,
			description
		});
		
		return service;
	}

	async create({
		pet_id,
		procedure,
		veterinarian,
		description,
		image
	}: ICreateServiceDTO): Promise<Service> {
		const service = this.repository.create({
			pet_id,
			procedure,
			veterinarian,
			description,
			image
		});

		await this.repository.save(service);

		return service;
	}

}

export { ServicesRepository };