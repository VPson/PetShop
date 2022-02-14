import { ICreateServiceDTO } from '@modules/pets/dtos/ICreateServiceDTO';
import { Service } from '@modules/pets/infra/typeorm/entities/services';
import { IServicesRepository } from '../IServicesRepository';


class ServicesRepositoryInMemory implements IServicesRepository {
	services: Service[] = []
	
	async create({
		pet_id,
		procedure,
		veterinarian,
		description,
		image
	}: ICreateServiceDTO): Promise<Service> {
		const service = new Service();

		Object.assign(service, {
			pet_id,
			procedure,
			veterinarian,
			description,
			image
		});
		this.services.push(service);

		return service;
	}

	async findService({
		pet_id,
		procedure,
		veterinarian,
		description,
	}: ICreateServiceDTO): Promise<Service> {
		const service = await this.services.find(service => 
			service.pet_id === pet_id &&
			service.procedure === procedure &&
			service.veterinarian === veterinarian &&
			service.description === description
			);

		return service;
	}

	async findByPetId(id: string): Promise<Service[]> {
		const services = await this.services.filter(service => service.pet_id === id);
		return services;
	}

}

export { ServicesRepositoryInMemory };