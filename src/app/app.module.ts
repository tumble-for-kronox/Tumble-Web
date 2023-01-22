import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_LEGACY_SNACK_BAR_DEFAULT_OPTIONS as MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/legacy-snack-bar';
import { TranslocoRootModule } from './transloco-root.module';
import { HeaderModule } from './header/header.module';
import { AuthHeaderInterceptor } from './helpers/interceptors/auth-header-interceptor/auth-header.interceptor';
import { ScheduleModule } from './schedule/schedule.module';
import { BodyModule } from './body/body.module';
import { SideBarModule } from './body/side-bar/side-bar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    TranslocoRootModule,
    HeaderModule,
    SideBarModule,
    ScheduleModule,
    BodyModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2000 }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
