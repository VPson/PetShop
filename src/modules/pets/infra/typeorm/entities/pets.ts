import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('pets')
class Pet {
	@PrimaryColumn()
	id: string

	@Column()
	user_id: string

	@Column()
	name: string

	@Column()
	birthDate: Date

	@Column()
	species: string

	@Column()
	breed: string

	@Column()
	gender: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date

	constructor() {
		if(!this.id){
			this.id = uuidV4();
		}
	}
}

export { Pet };