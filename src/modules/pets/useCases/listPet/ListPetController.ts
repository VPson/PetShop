import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListPetUseCase } from './ListPetUseCase';



class ListPetController {
	async handle(req: Request, res: Response): Promise<Response>{
		const { user_id } = req.user;
		const listPetUseCase = container.resolve(ListPetUseCase);

		const allPets = await listPetUseCase.execute({user_id});

		return res.json(allPets);
	}
}

export { ListPetController }; 