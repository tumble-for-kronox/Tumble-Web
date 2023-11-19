import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from 'src/app/models/web/themes';
import { StorageService } from '../../services/storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class ThemeSwitchService {
    private currentThemeSubject: BehaviorSubject<Theme> =
        new BehaviorSubject<Theme>(Theme.LIGHT);
    public currentTheme: Observable<Theme>;

    constructor(private storageService: StorageService) {
        let storedTheme = storageService.getTheme();
        console.log(storedTheme);

        if (!storedTheme) {
            const isDarkModePref =
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (isDarkModePref) {
                this.currentThemeSubject.next(Theme.DARK);
            }
        } else {
            this.currentThemeSubject.next(storedTheme);
        }

        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                const turnOn = e.matches;
                this.currentThemeSubject.next(
                    turnOn ? Theme.DARK : Theme.LIGHT,
                );
            });

        this.currentTheme = this.currentThemeSubject.asObservable();
    }

    public get currentThemeValue(): Theme {
        return this.currentThemeSubject.getValue();
    }

    public switchTheme() {
        console.log('Old theme', this.currentThemeValue);
        console.log(
            'Is old theme dark?',
            this.currentThemeValue === Theme.DARK,
        );
        const newTheme =
            this.currentThemeValue === Theme.DARK ? Theme.LIGHT : Theme.DARK;

        console.log('New theme', newTheme);

        this.storageService.setTheme(newTheme);

        console.log(this.storageService.getTheme());

        this.currentThemeSubject.next(newTheme);
    }
}
