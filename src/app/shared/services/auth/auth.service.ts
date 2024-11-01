import { HttpBackend, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BodyFields from 'src/app/config/constants/body_fields';
import Endpoints from 'src/app/config/constants/endpoints';
import QueryFields from 'src/app/config/constants/query_fields';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { UserResponseHandler } from 'src/app/helpers/backend/response-handlers/UserResponseHandler';
import { SchoolEnum } from 'src/app/models/enums/schools';
import KronoxUser from 'src/app/models/user/kronox_user';
import { SchoolService } from '../school/school.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<KronoxUser | null>;
    public currentUser: Observable<KronoxUser | null>;
    public loggedInObserve: Observable<boolean>;
    private http: HttpClient;

    constructor(
        httpBackend: HttpBackend,
        private schoolService: SchoolService,
        private storageService: StorageService,
    ) {
        this.http = new HttpClient(httpBackend);

        let storedRefreshToken = storageService.getRefreshToken();

        this.currentUserSubject = new BehaviorSubject<KronoxUser | null>(null);
        if (storedRefreshToken != null && storedRefreshToken != 'undefined') {
            this.refresh(this.schoolService.currentSchoolValue, storedRefreshToken).subscribe({
                error: (err) => {
                    console.log(err);
                    this.logout();
                },
                next: (value) => {
                    const user = KronoxUser.fromJson(value.body);
                    storageService.setRefreshToken(user.refreshToken);
                    storageService.setSessionDetails(user.sessionDetails);
                    this.currentUserSubject.next(user);
                },
            });
        }

        this.currentUser = this.currentUserSubject.asObservable();
        this.loggedInObserve = this.currentUserSubject.pipe(
            map((value) => {
                return value != null;
            }),
        );
    }

    public get currentUserValue(): KronoxUser | null {
        return this.currentUserSubject.value;
    }

    public get loggedIn(): boolean {
        return this.currentUserSubject.value != null;
    }

    login(schoolId: SchoolEnum, username: string, password: string): Observable<HttpResponse<Object>> {
        return this.http
            .post(Endpoints.baseUrl + Endpoints.login, BodyFields.login(username, password), {
                observe: 'response',
                params: {
                    [QueryFields.schoolId]: schoolId,
                },
            })
            .pipe(
                map((value) => {
                    if (!value.ok) return value;

                    const user = KronoxUser.fromJson(value.body);
                    this.storageService.setRefreshToken(user.refreshToken);
                    this.currentUserSubject.next(user);
                    return value;
                }),
            );
    }

    refresh(schoolId: SchoolEnum, refreshToken: string): Observable<HttpResponse<Object>> {
        return this.http.get(Endpoints.baseUrl + Endpoints.user, {
            observe: 'response',
            headers: {
                'X-auth-token': refreshToken,
            },
            params: {
                [QueryFields.schoolId]: schoolId,
            },
        });
    }

    logout() {
        this.storageService.clearRefreshToken();
        this.currentUserSubject?.next(null);
    }
}
