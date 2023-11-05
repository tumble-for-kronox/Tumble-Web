import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, InjectionToken, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Theme } from './models/web/themes';
import { ThemeSwitchService } from './shared/theme-switch/services/theme-switch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tumbleWeb';
  expandedSideBar!: boolean;
  private themeSubscription: Subscription;

  constructor(
    private themeService: ThemeSwitchService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.themeSubscription = this.themeService.currentTheme.subscribe(
      (theme) => {
        this.changeBodyTheme(theme);
      }
    );
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 800px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.expandedSideBar = false;
        } else {
          this.expandedSideBar = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private changeBodyTheme(theme: Theme) {
    const bodyElement = document.body;

    if (!bodyElement) return;

    if (theme === Theme.LIGHT) {
      bodyElement.classList.remove('dark-mode');
      return;
    }

    bodyElement.classList.add('dark-mode');
  }

  toggleExpandedSideBar() {
    this.expandedSideBar = !this.expandedSideBar;
  }
}
