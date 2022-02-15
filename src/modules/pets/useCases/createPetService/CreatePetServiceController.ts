import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePetServiceUseCase } from './CreatePetServiceUseCase';


class CreatePetServiceController{
async handle(req: Request, res: Response):Promise<Response>{
	const { id } = req.params;

	const createPetServiceUseCase = container.resolve(CreatePetServiceUseCase);

	const service = await createPetServiceUseCase.execute({ pet_id: id });
	return res.status(201).json(service);
}
}
export { CreatePetServiceController };