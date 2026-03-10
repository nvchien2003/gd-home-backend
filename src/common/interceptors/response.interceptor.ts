import { Observable, map } from 'rxjs';
import { INTERCEPTOR } from '../constant/constant';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
export interface Response<T> {
  signal: number;
  statusCode: number;
  data?: T;
  messages?: string;
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        signal: INTERCEPTOR.RESPONSE_SIGNAL.SUCCESS,
        messages: INTERCEPTOR.RESPONSE_STATUS.SUCCESS,
        statusCode: context.switchToHttp().getResponse().statusCode,
        data,
      })),
    );
  }
}
