import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUserRepository } from './user.repository.interface';
import { HttpError } from '../errors/http-error.class';
import { UsersData } from './user.table';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UsersData | null> {
		try {
			const user = new User(email, name);
			const salt = this.configService.get('SALT');
			await user.setPassword(password, +salt);
			const newUser = await this.userRepository.action(user);
			return newUser;
		} catch (e: unknown) {
			if (e instanceof HttpError) {
				throw new HttpError(400, e.message);
			} else {
				throw new Error('Ошибка сервера');
			}
		}
	}

	async validateUser({ email, password }: UserLoginDto): Promise<UsersData | null> {
		try {
			const check = await this.userRepository.findUser(email, password);
			return check;
		} catch (e: unknown) {
			if (e instanceof HttpError) {
				throw new HttpError(400, e.message);
			} else {
				throw new Error('Ошибка сервера');
			}
		}
	}
}
