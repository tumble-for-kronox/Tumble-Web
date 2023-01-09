import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Endpoints from '@constants/endpoints';
import { lastValueFrom } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { UserResponseHandler } from 'src/app/helpers/backend/response-handlers/UserResponseHandler';
import KronoxUser from 'src/app/models/user/kronox_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<KronoxUser | null>;
  public currentUser: Observable<KronoxUser | null>;

  constructor(private http: HttpClient) {
    let storedUser: string | null = localStorage.getItem('currentUser');

    this.currentUserSubject = storedUser == null ?
      this.currentUserSubject = new BehaviorSubject<KronoxUser | null>(null) :
      this.currentUserSubject = new BehaviorSubject<KronoxUser | null>(JSON.parse(storedUser!));

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): KronoxUser | null {
    return this.currentUserSubject.value
  }

  async login(username: string, password: string): Promise<KronoxUser | BackendResponse<null>> {
    const responseHandler = new UserResponseHandler()

    const response$ = this.http.post<HttpResponse<Object>>(
      Endpoints.debugBaseUrl + Endpoints.login,
      {
        username: username,
        password: password
      }
    )

    const response = responseHandler.parseLogin(await lastValueFrom(response$))

    if (response.status == BackendResponseStatus.SUCCESS) {
      const user = response.data!

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }

    return response as BackendResponse<null>;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
