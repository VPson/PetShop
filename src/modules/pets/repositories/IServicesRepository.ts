import { ICreateServiceDTO } from '../dtos/ICreateServiceDTO';
import { Service } from '../infra/typeorm/entities/services';

interface IServicesRepository {
	create(data:ICreateServiceDTO): Promise<Service>
}

export { IServicesRepository };