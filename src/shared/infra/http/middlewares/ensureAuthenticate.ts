import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayLoad {
	sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
	const authHeader = req.headers.authorization;

	if(!authHeader){
		throw new AppError('Token missing!');
	}

	const [, token] = authHeader.split(' ');
	
	try{ 
		const { sub: user_id } = verify(
			token, 
			'5c3897605943abc4ee8ca8ef043b0a37'
		) as IPayLoad;

		const userRepository = new UsersRepository();
		const user = await userRepository.findById(user_id);

		if(!user){
			throw new AppError('User does not exists!');
		}

		req.user = {
			user_id: user.id,
		};

		next();
	} catch {
		throw new AppError('Invalid Token', 401);
	}

}
