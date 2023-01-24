import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteModule } from './favourite/favourite.module';
import { SchoolPickerModule } from './school-picker/school-picker.module';
import { ThemeSwitchModule } from './theme-switch/theme-switch.module';
import { JoinPipe } from './pipes/join.pipe';



@NgModule({
  exports: [
    FavouriteModule,
    SchoolPickerModule,
    ThemeSwitchModule,
    JoinPipe
  ],
  declarations: [
    JoinPipe
  ],
  imports: [
    CommonModule,
    FavouriteModule,
    SchoolPickerModule,
    ThemeSwitchModule
  ]
})
export class SharedModule { }
