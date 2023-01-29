import {
	IsEmail,
	IsOptional,
	IsString,
	Matches,
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
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
	})
	password: string;
}
