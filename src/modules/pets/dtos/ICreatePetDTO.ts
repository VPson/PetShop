import { Service } from '../infra/typeorm/entities/services';

interface ICreatePetDTO{
	user_id: string
	name: string
	birthDate: Date
	species: string
	breed: string
	gender: string
	services?: Service[]
}

export { ICreatePetDTO };