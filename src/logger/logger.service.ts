import { Logger } from "tslog";
import { ILogObj } from "tslog/dist/types/interfaces";
import { ILogger } from "./logger.interface";
// interface LogObj {
//   displayInstanceName: boolean;
//   displayLoggerName: boolean;
//   displayFilePath: string;
// }
export class LoggerService implements ILogger {
  public logger: Logger<ILogObj>;
  constructor() {
    this.logger = new Logger();
  }
  log(...args: unknown[]) {
    this.logger.info(...args);
  }
  error(...args: unknown[]) {
    this.logger.error(...args);
  }
  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}
