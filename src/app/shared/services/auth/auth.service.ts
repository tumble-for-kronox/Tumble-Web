import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthorized: boolean = false

  constructor() { }

  public get isAuthorized(): boolean {
    return this._isAuthorized
  }
}
