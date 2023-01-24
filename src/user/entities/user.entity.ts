import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Postulation } from '../../postulation/entities/postulation.entity';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, nullable: true })
	name: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	email: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	password: string;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword(): Promise<any> {
		if (!this.password) return;
		this.password = await hash(this.password, 10);
	}

	@OneToMany(() => Postulation, (post) => post.userId)
	postulations?: Postulation[];
}
