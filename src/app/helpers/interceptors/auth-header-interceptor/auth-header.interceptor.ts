import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, timeout } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SchoolService } from 'src/app/shared/services/school/school.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.loggedIn) {
      request = request.clone({
        setHeaders: {
          "X-auth-header": this.authService.currentUserValue!.refreshToken
        }
      })
    }

    return next.handle(request).pipe(
      timeout(5000)
    );
  }
}
