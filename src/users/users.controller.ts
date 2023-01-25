import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HttpError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUsersController } from './users.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ValidateMiddleware } from '../common/validate.middleware';
@injectable()
export class UserController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/reg',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const result = await this.userService.validateUser(body);
			this.ok(res, { email: result?.email, name: result?.name });
		} catch (e: unknown) {
			if (e instanceof HttpError) {
				return next(new HttpError(401, e.message));
			} else {
				return next(new Error('Ошибка сервера'));
			}
		}
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const result = await this.userService.createUser(body);
			this.ok(res, { name: result?.name, email: result?.email });
		} catch (e: unknown) {
			if (e instanceof HttpError) {
				return next(new HttpError(401, e.message));
			} else {
				return next(new Error('Ошибка сервера'));
			}
		}
	}
}
