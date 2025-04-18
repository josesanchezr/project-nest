import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();
    req['requestId'] = requestId;
    const requestBody = req.body ? JSON.stringify(req.body) : '';

    // Guardamos el original de res.send
    const originalSend = res.send;

    // Interceptamos la respuesta
    res.send = function (body: any): Response {
      // Aquí puedes loguear el body
      console.log(`[${requestId}] Response: ${body}`);

      // Asegúrate de llamar al original
      return originalSend.call(this, body) as Response;
    };

    console.log(
      `[${requestId}] --> ${req.method} ${req.originalUrl} ${requestBody}`,
    );

    res.on('finish', () => {
      console.log(
        `[${requestId}] <-- ${req.method} ${req.originalUrl} ${res.statusCode}`,
      );
    });

    next();
  }
}
