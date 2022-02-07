import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Pet } from './pets';

@Entity('services')
class Service {
	@PrimaryColumn()
	id: string
	
	@ManyToOne(() => Pet)
	@JoinColumn({ name: 'pet_id' })
	pet: Pet
	
	@Column()
	pet_id: string

	@Column()
	procedure: string

	@Column()
	veterinarian: string

	@Column()
	image: string

	@CreateDateColumn()
	created_at: string

	@UpdateDateColumn()
	updated_at: string

	constructor(){
		if(!this.id){
			this.id = uuidV4;
		}
	}
}

export { Service };