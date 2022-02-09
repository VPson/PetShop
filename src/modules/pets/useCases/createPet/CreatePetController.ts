import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePetUseCase } from './CreatePetUseCase';

class CreatePetController {
	async handle(req: Request, res: Response): Promise<Response>{
		const {
			user_id,
			name,
			birthDate,
			species,
			breed,
			gender } = req.body;

		const createPetContoller = container.resolve(CreatePetUseCase);

		const pet = await createPetContoller.execute({
			user_id,
			name,
			birthDate,
			species,
			breed,
			gender
		});

		return res.status(201).json(pet);
	}
}

export { CreatePetController };