import { Request, Response } from 'express';


class CreatePetServiceController{
async handle(req: Request, res: Response):Promise<Response>{
	return res.send('perai ladrao');
}
}
export { CreatePetServiceController };