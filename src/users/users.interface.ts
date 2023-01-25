import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class';
import { User } from './user.entity';

export interface IUsersController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
