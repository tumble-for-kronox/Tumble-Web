import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteModule } from './favourite/favourite.module';
import { SchoolPickerModule } from './school-picker/school-picker.module';



@NgModule({
  exports: [
    FavouriteModule,
    SchoolPickerModule,
  ],
  declarations: [],
  imports: [
    CommonModule,
    FavouriteModule,
    SchoolPickerModule
  ]
})
export class SharedModule { }
