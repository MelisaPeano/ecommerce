import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch() // capturar todas las excepciones
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ha ocurrido un error inesperado';
    let responseMessage: string | object;

    if (exception instanceof HttpException) {
      // Si la excepción es un HttpException, obtener el código de estado y el mensaje || defecto 500
      status = exception.getStatus();
      responseMessage = exception.getResponse();
    }
    if (typeof responseMessage === 'string') {
      message = responseMessage; // Asigna directamente si es un string
    } else if (
      typeof responseMessage === 'object' &&
      responseMessage !== null
    ) {
      // Si es un objeto, intenta acceder a un mensaje específico
      message = (responseMessage as any).message || 'Error desconocido';
    }

    // Opcional: puedes añadir lógica personalizada para tipos específicos de excepciones
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
