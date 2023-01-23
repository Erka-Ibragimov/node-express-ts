import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IExeptionFilter } from './exeption.filter.interface';
import { HttpError } from './http-error.class';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}
	catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
		if (error instanceof HttpError) {
			this.logger.error(`[${error.context}] Ошибка ${error.statusCode} : ${error.message}`);
			res.status(error.statusCode).send({ err: error.message });
		} else {
			this.logger.error(`${error.message}`);
			res.status(500).send({ err: error.message });
		}
	}
}
