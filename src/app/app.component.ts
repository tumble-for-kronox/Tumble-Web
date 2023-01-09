import { Component, InjectionToken } from '@angular/core';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tumbleWeb';

  updateTheme(): void {

  }
}
