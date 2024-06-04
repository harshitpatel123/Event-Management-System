import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    Logger,
    HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from './logger.service';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
    
    private readonly logger = new Logger(ExceptionHandler.name);
    constructor(private readonly loggerService: LoggerService) {}
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const loggerService = new LoggerService();

        const status =
            exception instanceof HttpException ? exception.getStatus() : 500;

        this.logger.error(
            `HTTP error: ${status} ${exception.message}`,
            exception.stack,
        );
        
        loggerService.error(
            `HTTP error: ${status} ${exception.message}`,
            exception.stack,
        );

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
