import { Injectable } from '@nestjs/common';
import { TransformRequestInterceptor } from './transform.request';

@Injectable()
export class TrimStringInterceptor extends TransformRequestInterceptor {
  private except = ['password', 'confirmPassword'];

  transform(key: string, value: any) {
    if (
      this.isString(value) &&
      this.isString(key) &&
      !this.except.includes(key)
    ) {
      return value.trim();
    }

    return value;
  }

  isString(value: any): value is string {
    return typeof value === 'string' || value instanceof String;
  }
}
