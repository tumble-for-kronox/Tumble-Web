import { Injectable } from '@angular/core';
import StorageKeys from 'src/app/config/constants/storage_keys';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from 'src/app/models/web/themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {

  private currentThemeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.LIGHT);
  public currentTheme: Observable<Theme>

  constructor() {
    let storedTheme = localStorage.getItem(StorageKeys.savedTheme);

    if (storedTheme === "undefined" || storedTheme === null) {
      const isDarkModePref = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (isDarkModePref) {
        this.currentThemeSubject.next(Theme.DARK);
      }
    } else {
      this.currentThemeSubject.next(parseInt(storedTheme) as Theme)
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      const turnOn = e.matches;
      this.currentThemeSubject.next(turnOn ? Theme.DARK : Theme.LIGHT)
    })

    this.currentTheme = this.currentThemeSubject.asObservable();
  }

  public get currentThemeValue(): Theme {
    return this.currentThemeSubject.getValue();
  }

  public switchTheme() {
    const newTheme = this.currentThemeValue === Theme.DARK ? Theme.LIGHT : Theme.DARK;

    localStorage.setItem(StorageKeys.savedTheme, newTheme.toString())

    this.currentThemeSubject.next(newTheme);
  }
}
