import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { json } from 'body-parser';
import 'reflect-metadata';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IConfigService } from './config/config.service.interface';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.IUsersController) private userController: UserController,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = express();
		this.port = 9000;
	}

	public useBodyParser(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/api', this.userController.router);
	}

	public useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public init(): void {
		this.useBodyParser();
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port, () => {
			console.log(`Listening on port ${this.port}`);
		});
	}
}
