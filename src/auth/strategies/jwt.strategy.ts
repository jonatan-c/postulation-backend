import { ConfigService } from '@nestjs/config';
import { UserService } from './../../user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userService: UserService,
		private readonly config: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any): Promise<any> {
		const { sub: id } = payload;

		return await this.userService.getUserById(id);
	}
}
