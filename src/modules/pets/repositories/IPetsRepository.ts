import { ICreatePetDTO } from '@modules/pets/dtos/ICreatePetDTO';
import { Pet } from '@modules/pets/infra/typeorm/entities/pets';

interface IPetsRepository{
	create(data: ICreatePetDTO): Promise<Pet>;
	findPet(data: ICreatePetDTO): Promise<Pet>
}

export { IPetsRepository };