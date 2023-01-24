import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostulationDto } from './dto/create-postulation.dto';
import { UpdatePostulationDto } from './dto/update-postulation.dto';
import { Postulation } from './entities/postulation.entity';
// import { PostulationRepository } from './postulation.repository';
import { Repository } from 'typeorm';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageMetaDto } from './dto/page-meta.dto';
import { PageDto } from './dto/page.dto';

@Injectable()
export class PostulationService {
	constructor(
		// @InjectRepository(PostulationRepository)
		// private postulationRepository: PostulationRepository,

		@InjectRepository(Postulation)
		private readonly postulationRepository: Repository<Postulation>
	) {}

	async create(
		userId: number,
		createPostulationDto: CreatePostulationDto
	): Promise<any> {
		const postulation = await this.postulationRepository.create({
			...createPostulationDto,
			userId: userId as any,
		});
		return await this.postulationRepository.save(postulation);
	}

	async findAll(userId, pageOptionsDto: PageOptionsDto): Promise<any> {
		// return await this.postulationRepository.find({where: {userId}});
		const queryBuilder =
			this.postulationRepository.createQueryBuilder('postulation');
		queryBuilder.where('postulation.userId = :userId', { userId });
		queryBuilder.orderBy('postulation.id', 'DESC');
		queryBuilder.skip(pageOptionsDto.skip);
		queryBuilder.take(pageOptionsDto.take);

		const itemCount = await queryBuilder.getCount();
		const { entities } = await queryBuilder.getRawAndEntities();

		const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

		return new PageDto(entities, pageMetaDto);
	}

	async getPostulationById(userId, id: number): Promise<any> {
		const task = await this.postulationRepository.findOne(
			{
				where: { userId, id },
				// relations: ['image-description']
				relations: ['images'],
			}

			/// include relations with postulation
		);
		if (!task) {
			throw new NotFoundException(`Task with id ${+id} not found`);
		}
		return task;
	}

	async update(
		userId,
		id: number,
		updatePostulationDto: UpdatePostulationDto
	): Promise<any> {
		const postulationSelect = await this.getPostulationById(userId, id);
		if (!postulationSelect) {
			throw new NotFoundException(`Task with id ${id} not found`);
		}
		const editPostulation = Object.assign(
			postulationSelect,
			updatePostulationDto
		);

		return await this.postulationRepository.save(editPostulation);
	}

	async remove(userId, id: number): Promise<any> {
		try {
			const task = await this.postulationRepository.findOne({
				where: { userId, id },
			});
			if (!task) {
				throw new NotFoundException(`Postulation with id ${id} not found`);
			}

			return await this.postulationRepository.remove(task);
		} catch (error) {
			throw new NotFoundException(`Postulation with id ${id} not found`);
		}
	}
}
