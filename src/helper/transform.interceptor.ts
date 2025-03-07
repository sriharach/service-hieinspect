import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseCommon } from '../types/common/response.common';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseCommon<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseCommon<T>> {
    return next
      .handle()
      .pipe(map((data: T) => ({ data, status_code: HttpStatus.OK })));
  }
}
