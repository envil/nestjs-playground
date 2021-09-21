import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { CredinordError } from './errors/errors';

@Catch(CredinordError)
export class CredinordExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CredinordExceptionFilter.name);

  catch(exception: CredinordError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    this.logger.error(exception);
    response
      .status(exception.code)
      .json({
        statusCode: exception.code,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
