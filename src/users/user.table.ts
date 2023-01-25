import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersData {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({ unique: true })
	email: string;
	@Column()
	password: string;
	@Column()
	name: string;
}
