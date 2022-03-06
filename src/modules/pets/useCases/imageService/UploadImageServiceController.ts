import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadImageServiceUseCase } from './UploadImageServiceUseCase';

class UploadImageServiceController {
	async handle(req: Request, res: Response): Promise<Response>{
		const { id } = req.body;
		const service_image = req.file.filename;

		const updateServiceImageUseCase = container.resolve(UploadImageServiceUseCase);
		await updateServiceImageUseCase.execute({ service_id: id, service_image });
		
		return res.status(204).send();
	}
}

export { UploadImageServiceController };