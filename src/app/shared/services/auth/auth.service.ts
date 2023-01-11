import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import Endpoints from '@constants/endpoints';
import StorageKeys from '@constants/storage_keys';
import { lastValueFrom, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { BackendResponse, BackendResponseStatus } from 'src/app/helpers/backend/BackendResponse';
import { UserResponseHandler } from 'src/app/helpers/backend/response-handlers/UserResponseHandler';
import KronoxUser from 'src/app/models/user/kronox_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<KronoxUser | null>;
  public currentUser: Observable<KronoxUser | null>;
  public loggedIn: Observable<boolean>

  constructor(private http: HttpClient) {
    let storedUser = localStorage.getItem(StorageKeys.savedUser);
    this.currentUserSubject = storedUser === "undefined" ?
      new BehaviorSubject<KronoxUser | null>(null) :
      new BehaviorSubject<KronoxUser | null>(JSON.parse(storedUser!));

    this.currentUser = this.currentUserSubject.asObservable();
    this.loggedIn = this.currentUser.pipe(
      map((value) => {
        return value != null
      })
    )
  }

  public get currentUserValue(): KronoxUser | null {
    return this.currentUserSubject.value
  }

  async login(username: string, password: string): Promise<KronoxUser | BackendResponse<null>> {
    const responseHandler = new UserResponseHandler()

    const response$ = this.http.post(
      Endpoints.debugBaseUrl + Endpoints.login,
      {
        username: username,
        password: password
      },
      {
        observe: "response"
      }
    )

    const response = responseHandler.parseLogin(await lastValueFrom(response$))

    if (response.status == BackendResponseStatus.ERROR) {
      return response as BackendResponse<null>;
    }

    const user = response.data!

    localStorage.setItem(StorageKeys.savedUser, JSON.stringify(user));
    this.currentUserSubject?.next(user);
    return user;
  }

  async refresh() {
    const responseHandler = new UserResponseHandler()

    if (this.currentUserValue == null) {
      return;
    }

    const response$ = this.http.get(
      Endpoints.debugBaseUrl + Endpoints.refresh,
      {
        observe: "response",
        headers: {
          "authorization": this.currentUserValue.refreshToken
        }
      }
    )

    const response = responseHandler.parseLogin(await lastValueFrom(response$))

    if (response.status == BackendResponseStatus.ERROR) {
      this.logout()
    }

    const user = response.data!

    localStorage.setItem(StorageKeys.savedUser, JSON.stringify(user));
    this.currentUserSubject?.next(user);
  }

  logout() {
    localStorage.removeItem(StorageKeys.savedUser);
    this.currentUserSubject?.next(null);
  }
}
