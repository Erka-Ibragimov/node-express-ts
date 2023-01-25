import { injectable } from 'inversify';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import 'reflect-metadata';
import { AppDataSource } from '../settings/db.settings';
import { UsersData } from './user.table';

@injectable()
export class UserRepositoty implements IUserRepository {
	constructor() {}
	async action(user: User): Promise<UsersData | null> {
		const userRepository = AppDataSource.getRepository(UsersData);
		const oldUser = await userRepository.findOneBy({
			email: user.email,
		});
		if (oldUser) {
			return null;
		}
		const newUser = new UsersData();
		newUser.name = user.name;
		newUser.email = user.email;
		newUser.password = user.pass;
		await AppDataSource.manager.save(newUser);
		return newUser;
	}
}
