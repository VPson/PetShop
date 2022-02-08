import { ICreatePetDTO } from '@modules/pets/dtos/ICreatePetDTO';
import { Pet } from '@modules/pets/infra/typeorm/entities/pets';
import { IPetsRepository } from '../IPetsRepository';


class PetsRepositoryInMemory implements IPetsRepository{
	pets: Pet[] = []

	async findPet({
		user_id,
		name,
		bithDate,
		species,
		breed,
		gender
	}: ICreatePetDTO): Promise<Pet> {
		const pet = this.pets.find((pet) => 
		pet.user_id === user_id &&
		pet.name === name &&
		pet.bithDate === bithDate &&
		pet.species === species &&
		pet.breed === breed &&
		pet.gender === gender
		);
		return pet;
	}

	async create({
		user_id,
		name,
		bithDate,
		species,
		breed,
		gender
	}: ICreatePetDTO): Promise<Pet> {
		const pet = new Pet();

		Object.assign(pet, {
			user_id,
			name,
			bithDate,
			species,
			breed,
			gender
		});
		this.pets.push(pet);
		return pet;	
	}
	
}

export { PetsRepositoryInMemory };