import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, tap, timeout } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import SessionDetails from 'src/app/models/web/sessionDetails';

@Injectable({
    providedIn: 'root',
})
export class AuthHeaderInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private storageService: StorageService,
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.authService.loggedIn) {
            let storedSessionDetails = this.storageService.getSessionDetails();
            request = request.clone({
                setHeaders: {
                    'X-auth-token': this.authService.currentUserValue!.refreshToken,
                    'X-session-token': storedSessionDetails.toJson(),
                },
            });
        }

        return next.handle(request).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    const refreshToken = event.headers.get('X-auth-header');
                    const sessionDetails = event.headers.get('X-session-token');

                    if (refreshToken !== null) {
                        this.storageService.setRefreshToken(refreshToken);
                    }

                    if (sessionDetails !== null) {
                        this.storageService.setSessionDetails(SessionDetails.fromJson(sessionDetails));
                    }
                }
            }),
            timeout(5000),
        );
    }
}
