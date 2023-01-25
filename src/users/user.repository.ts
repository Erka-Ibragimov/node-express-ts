import { injectable } from 'inversify';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import 'reflect-metadata';
import { AppDataSource } from '../settings/db.settings';
import { UsersData } from './user.table';
import { HttpError } from '../errors/http-error.class';
import { DataSource } from 'typeorm';

@injectable()
export class UserRepositoty implements IUserRepository {
	userRepository;
	constructor() {
		this.userRepository = AppDataSource.getRepository(UsersData);
	}
	async action(user: User): Promise<UsersData | null> {
		const oldUser = await this.userRepository.findOneBy({
			email: user.email,
		});
		if (oldUser) {
			throw new HttpError(400, `Такой ${user.email} пользователь уже существует`);
		}
		const newUser = new UsersData();
		newUser.name = user.name;
		newUser.email = user.email;
		newUser.password = user.pass;
		await AppDataSource.manager.save(newUser);
		return newUser;
	}
	async findUser(email: string, password: string): Promise<UsersData | null> {
		const foundUser = await this.userRepository.findOneBy({ email: email });
		if (!foundUser) {
			throw new HttpError(401, `Такой пользователь ${email} не найден`);
		}
		const user = new User(email, 'a');
		const checkPass = await user.checkPass(password, foundUser.password);
		if (!checkPass) {
			throw new HttpError(401, `Не верный пароль`);
		}
		return foundUser;
	}
}
