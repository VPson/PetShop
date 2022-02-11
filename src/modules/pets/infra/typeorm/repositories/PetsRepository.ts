import { ICreatePetDTO } from '@modules/pets/dtos/ICreatePetDTO';
import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';
import { getRepository, Repository } from 'typeorm';
import { Pet } from '../entities/pets';


class PetsRepository implements IPetsRepository {
	private repository: Repository<Pet>
	constructor(){
		this.repository = getRepository(Pet);
	}

	async create({
	user_id,
	name,
	birthDate,
	species,
	breed,
	gender
	}: ICreatePetDTO): Promise<Pet> {
		const pet = this.repository.create({
			user_id,
			name,
			birthDate,
			species,
			breed,
			gender
		});

		await this.repository.save(pet);
		
		return pet;
	}
	async findPet({
	user_id,
	name,
	birthDate,
	species,
	breed,
	gender
	}: ICreatePetDTO): Promise<Pet> {
		const pet = await this.repository.findOne({
			user_id,
			name,
			birthDate,
			species,
			breed,
			gender
		});

		return pet;
	}

	async list():Promise<Pet[]>{
		const all = await this.repository.find();
		return all;
	}

	async findById(id: string): Promise<Pet> {
		return await this.repository.findOne(id);
	}

}

export { PetsRepository };