import { Component, InjectionToken, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Theme } from './models/web/themes';
import { ThemeSwitchService } from './shared/theme-switch/services/theme-switch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'tumbleWeb';
  expandedSideBar: boolean = true;
  private theme$: Subscription

  constructor(
    private themeService: ThemeSwitchService
  ) {
    this.theme$ = this.themeService.currentTheme.subscribe(theme => {
      this.changeBodyTheme(theme);
    });
  }
  ngOnDestroy(): void {
    this.theme$.unsubscribe();
  }

  private changeBodyTheme(theme: Theme) {
    const bodyElement = document.body;

    if (!bodyElement) return;

    if (theme === Theme.LIGHT) {
      bodyElement.classList.remove('dark-mode');
      return;
    }

    bodyElement.classList.add("dark-mode");
  }

  toggleExpandedSideBar() {
    this.expandedSideBar = !this.expandedSideBar;
  }
}
