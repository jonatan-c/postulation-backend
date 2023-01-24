import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export interface UserFindOne {
	id?: number;
	email?: string;
}

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>
	) {}

	async createUser(dto: CreateUserDto): Promise<any> {
		const isEmailInDB = await this.userRepository.findOne({
			where: { email: dto.email },
		});
		if (isEmailInDB) throw new BadRequestException('The email already exists');
		const newUser = this.userRepository.create(dto);
		const user = await this.userRepository.save(newUser);

		delete user.password;
		return user;
	}

	async findByEmail(data: UserFindOne): Promise<any> {
		const user = await this.userRepository.findOne({
			where: { email: data.email },
		});
		if (!user) throw new BadRequestException('The email does not exist');
		return user;
	}

	async getUserById(id: number): Promise<any> {
		const user = await this.userRepository.findOne({
			where: { id },
		});
		if (!user) throw new NotFoundException('The user does not exist');
		return user;
	}
}
