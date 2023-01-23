import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogObj } from 'tslog/dist/types/interfaces';
import { ILogger } from './logger.interface';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;
	constructor() {
		this.logger = new Logger();
	}
	log(...args: unknown[]): void {
		this.logger.info(...args);
	}
	error(...args: unknown[]): void {
		this.logger.error(...args);
	}
	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
