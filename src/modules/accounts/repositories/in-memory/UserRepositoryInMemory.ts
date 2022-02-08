import { ICreateUserDTO } from '@modules/accounts/dtos/iCreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';


class UsersRepositoryInMemory implements IUsersRepository{
	users: User[] = []

	async create({
		name, 
		cpf,
		email,
		password,
		contact,
		address
	}: ICreateUserDTO): Promise<void> {
		const user = new User();

		Object.assign(user, {
			name,
			cpf, 
			email,
			password,
			contact,
			address
		});
		this.users.push(user);
		console.log('Usuário registrado');
	}
	async findByEmail(email: string): Promise<User> {
		return this.users.find(user => user.email === email);
	}
	async findById(id: string): Promise<User> {
		return this.users.find(user => user.id === id);
	}
}

export { UsersRepositoryInMemory };