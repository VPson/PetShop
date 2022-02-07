import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	cpf: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	contact: number;

	@Column()
	isAdmin: boolean;

	@Column()
	address: string;
	
	@CreateDateColumn()	
	created_At: Date;

	constructor() {
		if (!this.id){
			this.id = uuidV4();
		}
	}
}

export { User };