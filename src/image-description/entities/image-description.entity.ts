import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Postulation } from '../../postulation/entities/postulation.entity';

@Entity('image-description')
export class ImageDescription {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	fileName: string;

	@Column({ type: 'varchar', length: 100 })
	descriptionFile: string;

	@Column({ type: 'varchar', length: 100 })
	fileUrl: string;

	@Column({ type: 'varchar', length: 100 })
	key: string;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;

	// @ManyToOne(() => Product, product => product.reviews)
	// product: Product;

	@ManyToOne(() => Postulation, (postulation) => postulation.images)
	postulation?: Postulation;
}
