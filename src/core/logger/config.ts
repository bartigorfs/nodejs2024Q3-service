import { transports, format } from 'winston';
import { WinstonModuleOptions } from 'nest-winston';

export const logger: WinstonModuleOptions = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    verbose: 4,
  },
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/combined.log',
      level: 'info',
    }),
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, context, timestamp }) => {
          return `[${timestamp}] [${level}] [${context || 'App'}] ${message}`;
        }),
      ),
    }),
  ],
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(({ level, message, context, timestamp }) => {
      return `[${timestamp}] [${level}] [${context || 'App'}] ${message}`;
    }),
  ),
};
