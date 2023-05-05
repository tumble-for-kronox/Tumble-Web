import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { AccountBtnComponent } from './components/account-btn/account-btn.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { MatRippleModule } from '@angular/material/core';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [
    HeaderContainerComponent
  ],
  declarations: [
    HeaderContainerComponent,
    SearchBarComponent,
    HeaderLogoComponent,
    AccountBtnComponent,
    SearchResultComponent,
    LoginModalComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    TranslocoModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    SharedModule,
    MatSelectModule,
    MatRippleModule,
    LayoutModule,
    RouterModule
  ]
})
export class HeaderModule { }
