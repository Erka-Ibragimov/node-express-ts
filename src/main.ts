import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { AppDataSource } from './settings/db.settings';
import { TYPES } from './types';
import { UserRepositoty } from './users/user.repository';
import { IUserRepository } from './users/user.repository.interface';
import { UserService } from './users/user.service';
import { IUserService } from './users/user.service.interface';
import { UserController } from './users/users.controller';
import { IUsersController } from './users/users.interface';

export interface IBootstrapReturnType {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUsersController>(TYPES.IUsersController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepositoty).inRequestScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturnType {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	AppDataSource.initialize()
		.then(() => {
			console.log('Подключился к базе');
		})
		.catch((error) => {
			console.log(error);
		});
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
