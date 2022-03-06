import { ICreateServiceDTO } from '@modules/pets/dtos/ICreateServiceDTO';
import { IServicesRepository } from '@modules/pets/repositories/IServicesRepository';
import { getRepository, Repository } from 'typeorm';
import { Service } from '../entities/services';

class ServicesRepository implements IServicesRepository {
	private repository: Repository<Service>
	constructor(){
		this.repository = getRepository(Service);
	}
	
	async create({
		id,
		pet_id,
		procedure,
		veterinarian,
		description,
		image
	}: ICreateServiceDTO): Promise<Service> {
		const service = this.repository.create({
			id,
			pet_id,
			procedure,
			veterinarian,
			description,
			image
		});

		await this.repository.save(service);

		return service;
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

	async findById(id: string): Promise<Service>{
		return await this.repository.findOne(id);
	}

	async findByPetId(pet_id: string): Promise<Service[]> {
		const services = await this.repository.find({ pet_id: pet_id });
		return services;
	}

}

export { ServicesRepository };