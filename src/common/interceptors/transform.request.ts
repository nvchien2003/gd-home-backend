import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TransformRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.cleanRequest(context.switchToHttp().getRequest());
    return next.handle();
  }

  cleanRequest(req: any): void {
    this.cleanObject(req.params);
    this.cleanObject(req.query);

    if (req.method !== 'GET') {
      this.cleanObject(req.body);
    }
  }

  cleanObject(obj: any): void {
    if (!obj || typeof obj !== 'object') return;

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (value === '' || value === null || value === undefined) {
        delete obj[key];
      }

      if (typeof value === 'object') {
        this.cleanObject(value);
      }
    });
  }
}
