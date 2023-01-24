import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(@Body() dto: CreateUserDto): Promise<any> {
		const data = await this.userService.createUser(dto);
		return { message: 'User created successfully', data };
	}
}
