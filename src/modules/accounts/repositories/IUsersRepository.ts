import { ICreateUserDTO } from '../dtos/iCreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository{
	create(date: ICreateUserDTO): Promise<void>
	findByEmail(email: string): Promise<User>
	findById(id: string): Promise<User>
}

export { IUsersRepository };