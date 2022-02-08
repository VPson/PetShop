import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IRequest{
	email: string,
	password: string
}

interface IResponse {
	user: {
		name: string,
		email: string
	},
	token: string
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	){}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if(!user){
			throw new AppError('Email or password incorrect!');
		}

		const passwordMatch = compare(password, user.password);

		if(!passwordMatch){
			throw new AppError('Password incorrect');
		}

		const token = sign({}, '5c3897605943abc4ee8ca8ef043b0a37', {
			subject: user.id,
			expiresIn: '1d'
		});

		const tokenResponse: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email
			}
		};

		return tokenResponse;
	}
}

export { AuthenticateUserUseCase };