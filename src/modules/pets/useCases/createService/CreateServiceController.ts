import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateServiceUseCase } from './CreateServiceUseCase';

class CreateServiceController {
	async handle(req: Request, res: Response): Promise<Response>{
		const { id } = req.params;
		const { 			
			procedure,
			veterinarian,
			description,
			image } = req.body;

			const createServiceUseCase = container.resolve(CreateServiceUseCase);

			const service = await createServiceUseCase.execute({
				pet_id: id,
				procedure,
				veterinarian,
				description,
				image
			});

		return res.status(201).json(service);
	}
}

export { CreateServiceController };