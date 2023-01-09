import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/assets/i18n')) {
      return next.handle(request)
    }

    return next.handle(request).pipe(
      timeout(5000)
    );
  }
}
