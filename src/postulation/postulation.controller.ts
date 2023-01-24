import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	Res,
	HttpStatus,
	Req,
	Query,
} from '@nestjs/common';
import { PostulationService } from './postulation.service';
import { CreatePostulationDto } from './dto/create-postulation.dto';
import { UpdatePostulationDto } from './dto/update-postulation.dto';
import { Auth } from 'src/common/decoratos/auth.decorator';
import { User } from 'src/common/decoratos/user.decorators';
import { User as UserEntity } from './../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from './dto/page-options.dto';
import { ApiPaginatedResponse } from 'src/common/decoratos/api-paginated-response.decorator';

@ApiTags('postulation')
@Controller('postulation')
export class PostulationController {
	constructor(private readonly postulationService: PostulationService) {}

	@Auth()
	@Post()
	async create(
		@Body() createPostulationDto: CreatePostulationDto,
		@Res() res,
		@Req() req,
		@User() user: UserEntity
	): Promise<any> {
		try {
			const postulationCreated = await this.postulationService.create(
				user.id,
				createPostulationDto
			);

			return res.status(HttpStatus.OK).json({
				message: 'Postulation created successfully',
				postulationCreated,
			});
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				message: 'Error creating postulation',
				error,
			});
		}
	}

	@Auth()
	@ApiPaginatedResponse(CreatePostulationDto)
	@Get()
	async findAll(
		@User() user: UserEntity,
		@Query() pageOptionsDto: PageOptionsDto
	): Promise<any> {
		return await this.postulationService.findAll(user.id, pageOptionsDto);
	}

	@Auth()
	@Get('/:id')
	async findOne(
		@User() user: UserEntity,
		@Param('id') id: number,
		@Res() res
	): Promise<any> {
		try {
			const postulationSelected =
				await this.postulationService.getPostulationById(user.id, id);
			return res.status(HttpStatus.OK).json({
				message: 'Postulation found successfully',
				postulationSelected,
			});
		} catch (error) {
			return res.status(error.status).json(error.response);
		}
	}

	@Auth()
	@Put('/:id')
	async update(
		@User() user: UserEntity,
		@Param('id') id: number,
		@Body() updatePostulationDto: UpdatePostulationDto,
		@Res() res
	): Promise<any> {
		try {
			const postulationSelected = await this.postulationService.update(
				user.id,
				id,
				updatePostulationDto
			);
			return res.status(HttpStatus.OK).json({
				message: 'Postulation updated successfully',
				postulationSelected,
			});
		} catch (error) {
			return res.status(error.status).json(error.response);
		}
	}

	@Auth()
	@Delete(':id')
	async remove(
		@User() user: UserEntity,
		@Param('id') id: number,
		@Res() res
	): Promise<any> {
		try {
			const postulationSelected = this.postulationService.remove(user.id, id);
			return res.status(HttpStatus.OK).json({
				message: 'Postulation deleted successfully',
				postulationSelected,
			});
		} catch (error) {
			return res.status(error.status).json(error.response);
		}
	}
}
