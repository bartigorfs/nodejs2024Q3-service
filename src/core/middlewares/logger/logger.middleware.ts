import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLogger } from '@/core/logger/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: WinstonLogger) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, url } = req;
    const start = Date.now();

    const oldSend = res.send;
    const oldJson = res.json;

    const chunks: any[] = [];

    res.send = (...args: any[]): Response => {
      chunks.push(args);
      return oldSend.apply(res, args);
    };

    res.json = (...args: any[]): Response => {
      chunks.push(args);
      return oldJson.apply(res, args);
    };

    res.on('finish', () => {
      const duration = Date.now() - start;
      const responseBody = chunks.length > 0 ? chunks.join('') : '';
      const requestBody = req.body ? JSON.stringify(req.body) : '';

      const logMessage = `
        ${method} ${url} ${res.statusCode} - ${duration}ms
        Request Body: ${
          requestBody.length > 2000 ? '[Too large to display]' : requestBody
        }
        Response Body: ${
          responseBody.length > 2000 ? '[Too large to display]' : responseBody
        }
      `;

      this.logger.log(logMessage);
    });

    next();
  }
}
