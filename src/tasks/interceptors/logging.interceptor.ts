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
    let inicioTransaccion: number;

    if (request.method === 'PATCH') {
      inicioTransaccion = Date.now();
      console.log('Inicio de la petición PATCH:', new Date(inicioTransaccion));
      console.log('Body:', request.body);
    }

    return next.handle().pipe(
      tap(() => {
        if (request.method === 'PATCH') {
          const finTransaccion = Date.now();
          console.log('Fin de la petición PATCH:', new Date(finTransaccion));
          console.log(
            'Duración de la transacción:',
            finTransaccion - inicioTransaccion,
            'ms',
          );
        }
      }),
    );
  }
}
