import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDescriptionDto } from './dto/create-image-description.dto';
import { ImageDescription } from './entities/image-description.entity';
import { PostulationService } from 'src/postulation/postulation.service';
import { S3 } from 'aws-sdk';

@Injectable()
export class ImageDescriptionService {
	constructor(
		// @InjectRepository(PostulationRepository)
		// private postulationRepository: PostulationRepository,

		@InjectRepository(ImageDescription)
		private readonly imageRepository: Repository<ImageDescription>,

		// @InjectRepository(Postulation)
		// private readonly postulationRepository : Repository<Postulation>

		// TODO El error era que estaba trayendo dos repositrios, y realmente necesitaba un repositorio de este modulo y traer directamente el servicio de postulation

		private readonly postulationService: PostulationService
	) {}

	async uploadFile(
		id: number,
		createImageDescriptionDto: CreateImageDescriptionDto,
		dataBuffer: Buffer,
		fileName?: string
	): Promise<any> {
		const s3 = new S3();
		const uploadResult = await s3
			.upload({
				Bucket: process.env.AWS_BUCKET_NAME,
				Body: dataBuffer,
				Key: fileName,
				ACL: 'public-read',
				ContentDisposition: 'inline',
				ContentType: 'image/png',
			})
			.promise();

		const newFile = await this.imageRepository.create({
			...createImageDescriptionDto,
			postulation: { id },
			fileUrl: uploadResult.Location,
			key: uploadResult.Key,
		});

		await this.imageRepository.save(newFile);

		return newFile;

		// version sin caraga de archivo
		// const postulation = await this.postulationService.getPostulationById(id);
		// if (postulation) {
		//   const image = await this.imageRepository.create(createImageDescriptionDto);
		//   image.postulation = postulation;
		//   return await this.imageRepository.save(image);
		// } else {
		//   throw new Error('Postulation not found');
		// }
	}

	async findAll(): Promise<any> {
		const data = await this.imageRepository.find({
			relations: ['postulation'],
		});
		return data;
	}

	async findOne(userId, id: number): Promise<any> {
		// realations with postulation and user
		const data = await this.imageRepository.findOne({
			where: { id },
			relations: ['postulation'],
		});

		if (!data) {
			throw new NotFoundException(`Image with id ${id} not found`);
		}
		const s3 = await this.getS3();
		const params = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: data.key,
		};

		const url = await s3.getSignedUrlPromise('getObject', params);
		data.fileUrl = url;
		return data;
	}

	// update(id: number, updateImageDescriptionDto: UpdateImageDescriptionDto) {
	//   return `This action updates a #${id} imageDescription`;
	// }

	async getS3(): Promise<any> {
		return new S3({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.AWS_REGION,
		});
	}

	async remove(id: number): Promise<any> {
		const data = await this.imageRepository.findOne({
			where: { id },
			relations: ['postulation'],
		});
		try {
			if (!data) {
				throw new NotFoundException(`Image with id ${id} not found`);
			}
			const s3 = await this.getS3();
			const params = {
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: data.key,
			};

			s3.deleteObject(params, function (err, data) {
				if (err) console.log(err, err.stack); // error
				else console.log(data); // deleted
			});

			await this.imageRepository.delete(id);
		} catch (error) {
			// if (!data){
			//   throw new NotFoundException(`Image with id ${id} not found`);
			// }
			console.log(error);
		}
	}
}
