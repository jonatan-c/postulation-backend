// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

// export class UpdatePostulationDto extends PartialType(CreatePostulationDto) {}

export class UpdatePostulationDto {
	// id?: number;

	// dateSend: string;

	// feedback: boolean;

	// dateFeedback: string;
	@ApiProperty()
	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	@MinLength(3)
	company: string;

	// createdAt: Date;

	// updatedAt: Date;
}
