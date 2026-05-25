import { Observable, map } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RAW_RESPONSE_KEY } from '../decorators/raw-response.decorator';
export interface Response<T> {
  success: boolean;
  data?: T;
  meta?: unknown;
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const rawResponse = this.reflector.getAllAndOverride<boolean>(
      RAW_RESPONSE_KEY,
      [context.getHandler(), context.getClass()],
    );

    return next.handle().pipe(
      map((data) => {
        if (rawResponse) {
          return data;
        }

        if (
          data &&
          typeof data === 'object' &&
          'items' in data &&
          'meta' in data
        ) {
          return {
            success: true,
            data: data.items,
            meta: data.meta,
          };
        }

        return {
          success: true,
          data,
        };
      }),
    );
  }
}
