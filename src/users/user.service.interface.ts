import { HttpError } from '../errors/http-error.class';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersData } from './user.table';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UsersData | null>;
	validateUser: (dto: UserLoginDto) => Promise<UsersData | null>;
}
