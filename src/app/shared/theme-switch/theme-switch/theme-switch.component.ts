import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { Theme } from 'src/app/models/web/themes';
import { ThemeSwitchService } from '../services/theme-switch.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
})
export class ThemeSwitchComponent implements OnDestroy {
  themeSubscription: Subscription;
  isDarkMode$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private themeService: ThemeSwitchService) {
    this.themeSubscription = this.themeService.currentTheme.subscribe(
      (theme) => {
        this.isDarkMode$.next(theme === Theme.DARK);
      }
    );
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  switchTheme() {
    this.themeService.switchTheme();
  }
}
