import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { FavouriteModule } from './favourite/favourite.module';



@NgModule({
  exports: [
    HeaderModule
  ],
  declarations: [],
  imports: [
    CommonModule,
    FavouriteModule
  ]
})
export class SharedModule { }
