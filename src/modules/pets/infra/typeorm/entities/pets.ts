import { User } from 'modules/accounts/infra/typeorm/entities/User';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('pets')
class Pet {
	@PrimaryColumn()
	id: string

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id'})
	user: User

	@Column()
	user_id: string

	@Column()
	name: string

	@Column()
	bithDate: Date

	@Column()
	species: string

	@Column()
	breed: string

	@Column()
	gender: string

	@CreateDateColumn()
	created_ad: Date

	@UpdateDateColumn()
	updated_at: Date

	constructor() {
		if(!this.id){
			this.id = uuidV4;
		}
	}
}

export { Pet };