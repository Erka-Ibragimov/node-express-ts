import { User } from './user.entity';
import { UsersData } from './user.table';

export interface IUserRepository {
	action: (user: User) => Promise<UsersData | null>;
}
