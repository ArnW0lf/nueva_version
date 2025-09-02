import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    if (exception instanceof HttpException) {
      // Maneja excepciones HTTP estándar (ej. ValidationPipe, NotFoundException de un controlador local)
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception.status && typeof exception.status === 'number') {
      // Maneja errores propagados desde microservicios que tienen la forma { status, message }
      status = exception.status;
      message = exception.message || exception;
    }

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      // Asegura una respuesta consistente, ya sea que el mensaje sea una cadena o un objeto
      ...(typeof message === 'string' ? { message } : (message as object)),
    };

    response.status(status).json(responseBody);
  }
}