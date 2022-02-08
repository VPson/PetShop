import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePetUseCase } from './CreatePetUseCase';
import { v4 as uuidV4 } from 'uuid';

class CreatePetController {
	async handle(req: Request, res: Response): Promise<Response>{
		const {
			user_id,
			name,
			birthDate,
			species,
			breed,
			gender } = req.body;
			const a = uuidV4(user_id);

		const createPetContoller = container.resolve(CreatePetUseCase);

		const pet = await createPetContoller.execute({
			user_id: a,
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