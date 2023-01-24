import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { User } from './../user/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.userService.findByEmail({ email });
		try {
			await compare(pass, user.password);
		} catch (error) {
			console.log(error);
		}

		if (user && (await compare(pass, user.password))) {
			const { password, ...rest } = user;
			return rest;
		}

		return null;
	}

	login(user: User): any {
		const { id } = user;
		const payload = { sub: id };
		return {
			user,
			accessToken: this.jwtService.sign(payload),
		};
	}
}
