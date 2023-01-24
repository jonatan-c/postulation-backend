import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Res,
	HttpStatus,
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { ImageDescriptionService } from './image-description.service';
import { CreateImageDescriptionDto } from './dto/create-image-description.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decoratos/auth.decorator';
import { User } from 'src/common/decoratos/user.decorators';
import { User as UserEntity } from 'src/user/entities/user.entity';

@ApiTags('image-description')
@Controller('image-description')
export class ImageDescriptionController {
	constructor(
		private readonly imageDescriptionService: ImageDescriptionService
	) {}

	@Post('/:idPostulation/image')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(
		@Param('idPostulation') id: number,
		@Body() createImageDescriptionDto: CreateImageDescriptionDto,
		@Res() res,
		@UploadedFile() file: Express.Multer.File
	): Promise<any> {
		const imageDescriptionCreated =
			await this.imageDescriptionService.uploadFile(
				id,
				createImageDescriptionDto,
				file.buffer,
				file.originalname
			);
		console.log('File has been uploaded,', imageDescriptionCreated.fileUrl);

		res.status(200).json({
			message: 'Image uploaded successfully',
			imageDescriptionCreated,
		});
	}

	@Get()
	async findAll(): Promise<any> {
		const data = this.imageDescriptionService.findAll();
		return await data;
	}

	@Auth()
	@Get(':id')
	async findOne(
		@User() userId: UserEntity,
		@Param('id') id: number,
		@Res() res
	): Promise<any> {
		try {
			const imageSelected = await this.imageDescriptionService.findOne(
				userId,
				id
			);
			return res.status(HttpStatus.OK).json({
				message: 'Image found successfully',
				imageSelected,
			});
		} catch (error) {
			return res.status(error.status).json(error.response);
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: number, @Res() res): Promise<any> {
		try {
			const imageSelected = this.imageDescriptionService.remove(id);
			return res.status(HttpStatus.OK).json({
				message: 'Image deleted successfully',
				imageSelected,
			});
		} catch (error) {
			return res.status(error.status).json(error.response);
		}
	}
}
