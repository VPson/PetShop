import { Pet } from '@modules/pets/infra/typeorm/entities/pets';
import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	user_id: string
}

@injectable()
class ListPetUseCase {
	constructor(
		@inject('PetsRepository')
		private petsRepository: IPetsRepository,
	){}

	async execute( {user_id}: IRequest ):Promise<Pet[]> {
		const pets = await this.petsRepository.listPets(user_id);
		
		return pets;
	}

}

export { ListPetUseCase };