import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    if (request.method === 'PATCH') {
      console.log('Inicio de la petición PATCH:', new Date());
      console.log('Body:', request.body);
    }

    return next
      .handle()
      .pipe(
        tap(
          () =>
            request.method === 'PATCH' &&
            console.log('Fin de la petición PATCH:', new Date()),
        ),
      );
  }
}
