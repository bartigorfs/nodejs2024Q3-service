import { Injectable, LoggerService, Inject } from '@nestjs/common';

import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class WinstonLogger implements LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly winstonLogger: Logger,
  ) {}

  log(message: string, context?: string): void {
    this.winstonLogger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string): void {
    this.winstonLogger.error(message, { context, trace });
  }

  warn(message: string, context?: string): void {
    this.winstonLogger.warn(message, { context });
  }

  debug(message: string, context?: string): void {
    this.winstonLogger.debug(message, { context });
  }

  verbose(message: string, context?: string): void {
    this.winstonLogger.verbose(message, { context });
  }
}
