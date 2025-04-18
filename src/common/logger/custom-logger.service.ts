import { Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Inject } from '@nestjs/common';
import { RequestWithId } from '../interfaces/request-with-id.interface';

@Injectable({ scope: Scope.REQUEST })
export class CustomLoggerService {
  constructor(@Inject(REQUEST) private readonly request: RequestWithId) {}

  log(message: string) {
    const requestId = this.request.requestId ?? 'NO-ID';
    console.log(`[${requestId}] ${message}`);
  }
}
