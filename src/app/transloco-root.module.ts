import { HttpBackend, HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule
} from '@ngneat/transloco';
import { Injectable, isDevMode, NgModule } from '@angular/core';
import { provideTranslocoMessageformat } from '@ngneat/transloco-messageformat';


@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend)
  }

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'da'],
        defaultLang: 'en',
        fallbackLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    provideTranslocoMessageformat()
  ]
})
export class TranslocoRootModule { }
