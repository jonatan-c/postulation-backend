import {
	IsEmail,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@IsOptional()
	@IsString()
	@MaxLength(50)
	name: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(20)
	password: string;
}
