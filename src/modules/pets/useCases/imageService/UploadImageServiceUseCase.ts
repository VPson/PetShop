import { IServicesRepository } from '@modules/pets/repositories/IServicesRepository';
import { inject, injectable } from 'tsyringe';
import { deleteFile } from 'utils/file';

interface IRequest {
	service_id: string;
	service_image: string
}

@injectable()
class UploadImageServiceUseCase{
	constructor(
		@inject('ServicesRepository')
		private servicesRepository: IServicesRepository
	){}

	async execute({ service_id, service_image }: IRequest): Promise<void>{
		const service = await this.servicesRepository.findById(service_id);

		if (service.image) {
			await deleteFile(`./tmp/${service.image}`);
		}
		service.image = service_image;

		await this.servicesRepository.create(service);
	}

}

export { UploadImageServiceUseCase }; 