import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { AccountBtnComponent } from './components/account-btn/account-btn.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ]
})
export class HeaderModule { }
