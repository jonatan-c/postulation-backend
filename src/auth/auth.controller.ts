import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decoratos/user.decorators';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth-guards';
import { User as UserEntity } from './../user/entities/user.entity';
import { Auth } from 'src/common/decoratos/auth.decorator';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(
		@Body() loginDTO: LoginDTO,
		@User() user: UserEntity
	): Promise<any> {
		const data = await this.authService.login(user);

		return {
			message: 'Logged in successfully',
			data,
		};
	}

	@Auth()
	@Get('profile')
	profile(@User() user: UserEntity): any {
		return {
			message: 'Logged in successfully',
			user,
		};
	}
}
