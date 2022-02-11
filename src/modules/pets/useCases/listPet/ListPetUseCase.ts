import { Pet } from '@modules/pets/infra/typeorm/entities/pets';
import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';

interface IRequest {
	user_id: string
}

class ListPetUseCase {
	constructor(
		private petsRepository: IPetsRepository,
	){}

	async execute( {user_id}: IRequest ):Promise<Pet[]> {
		const pets = await this.petsRepository.listPets(user_id);
		
		return pets;
	}

}

export { ListPetUseCase };