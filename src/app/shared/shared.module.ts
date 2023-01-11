import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteModule } from './favourite/favourite.module';



@NgModule({
  exports: [
    FavouriteModule
  ],
  declarations: [],
  imports: [
    CommonModule,
    FavouriteModule
  ]
})
export class SharedModule { }
