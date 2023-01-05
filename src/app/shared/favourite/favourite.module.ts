import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteButtonComponent } from './favourite-button/favourite-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  exports: [
    FavouriteButtonComponent
  ],
  declarations: [
    FavouriteButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class FavouriteModule { }
