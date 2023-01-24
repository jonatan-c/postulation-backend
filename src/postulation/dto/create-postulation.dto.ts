import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostulationDto {
	@ApiProperty()
	id?: number;

	@ApiProperty()
	dateSend: string;

	@ApiProperty()
	feedback: boolean;

	@ApiProperty()
	dateFeedback: string;

	@ApiProperty()
	@ApiProperty()
	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	@MinLength(3)
	company: string;

	description?: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty()
	userId?: number;
}
