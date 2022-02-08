import { hash } from 'bcrypt';
import { IUsersRepository } from 'modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest{
	name: string,
	cpf: string,
	email: string,
	password: string,
	contact: string,
	address: string,
}

@injectable()
class CreateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	){}
	async execute({
		name, 
		cpf,
		email,
		password,
		contact,
		address
	}:IRequest): Promise<void>{
		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if(userAlreadyExists){
			throw new Error('User already exists!');
		}

		const passwordHash = await hash(password, 8);

		await this.usersRepository.create({
			name, 
			cpf,
			email,
			password: passwordHash,
			contact,
			address
		});
	}
}

export { CreateUserUseCase };