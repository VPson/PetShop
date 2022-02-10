import { ICreateServiceDTO } from '@modules/pets/dtos/ICreateServiceDTO';
import { Service } from '@modules/pets/infra/typeorm/entities/services';
import { IServicesRepository } from '../IServicesRepository';


class ServicesRepositoryInMemory implements IServicesRepository {
	services: Service[] = []

	async create({
		pet_id,
		procedure,
		veterinarian,
		image
	}: ICreateServiceDTO): Promise<Service> {
		const service = new Service();

		Object.assign(service, {
			pet_id,
			procedure,
			veterinarian,
			image
		});
		this.services.push(service);

		return service;
	}
}

export { ServicesRepositoryInMemory };