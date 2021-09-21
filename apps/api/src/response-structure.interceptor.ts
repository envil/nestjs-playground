import {
  CallHandler,
  ExecutionContext,
  Injectable, Logger,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseStructureInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseStructureInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(data => {
        this.logger.log(data);
        return {
          data
        };
      }),
    );
  }
}
