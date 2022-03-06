import { ICreateServiceDTO } from '../dtos/ICreateServiceDTO';
import { Service } from '../infra/typeorm/entities/services';

interface IServicesRepository {
	create(data: ICreateServiceDTO): Promise<Service>
	findService(date: ICreateServiceDTO): Promise<Service>
	findByPetId(id: string): Promise<Service[]>
	findById(id: string): Promise<Service>
}

export { IServicesRepository };