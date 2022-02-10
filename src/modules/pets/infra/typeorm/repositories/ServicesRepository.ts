import { ICreateServiceDTO } from '@modules/pets/dtos/ICreateServiceDTO';
import { IServicesRepository } from '@modules/pets/repositories/IServicesRepository';
import { Service } from '../entities/services';

class ServicesRepository implements IServicesRepository {
	create(data: ICreateServiceDTO): Promise<Service> {
		throw new Error('Method not implemented.');
	}

}

export { ServicesRepository };