import { ImageDescription } from '../../image-description/entities/image-description.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('postulation')
export class Postulation {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column({ type: 'varchar', length: 100 })
	company: string;

	@ApiProperty()
	@Column({ type: 'date' })
	dateSend: string;

	@ApiProperty()
	@Column({ type: 'boolean', default: false })
	feedback: boolean;

	@ApiProperty()
	@Column({ type: 'date' })
	dateFeedback: string;

	@ApiProperty()
	@Column({ type: 'varchar', length: 255 })
	description: string;

	@ApiProperty()
	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@ApiProperty()
	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;

	// relaciones
	// @OneToMany(() => Review, review => review.product)
	// reviews: Review[];
	@ApiProperty()
	@OneToMany(() => ImageDescription, (img) => img.postulation)
	images?: ImageDescription[];

	@ApiProperty()
	@ManyToOne(() => User, (user) => user.postulations)
	userId?: User;
}
