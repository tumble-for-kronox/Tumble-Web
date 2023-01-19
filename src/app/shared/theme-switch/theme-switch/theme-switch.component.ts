import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { Theme } from 'src/app/models/web/themes';
import { ThemeSwitchService } from '../services/theme-switch.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent {
  theme$: Subscription;
  isDarkMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private themeService: ThemeSwitchService) {
    this.theme$ = this.themeService.currentTheme.subscribe(theme => {
      this.isDarkMode.next(theme === Theme.DARK);
    })
  }

  switchTheme() {
    this.themeService.switchTheme();
  }
}
