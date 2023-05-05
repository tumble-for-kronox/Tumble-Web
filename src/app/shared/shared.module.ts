import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteModule } from './favourite/favourite.module';
import { SchoolPickerModule } from './school-picker/school-picker.module';
import { ThemeSwitchModule } from './theme-switch/theme-switch.module';
import { ScheduleIdFormatterPipe } from './pipes/schedule-id-formatter/schedule-id-formatter.pipe';
import { JoinPipe } from './pipes/join/join.pipe';



@NgModule({
  exports: [
    FavouriteModule,
    SchoolPickerModule,
    ThemeSwitchModule,
    JoinPipe,
    ScheduleIdFormatterPipe
  ],
  declarations: [
    JoinPipe,
    ScheduleIdFormatterPipe
  ],
  imports: [
    CommonModule,
    FavouriteModule,
    SchoolPickerModule,
    ThemeSwitchModule
  ]
})
export class SharedModule { }
