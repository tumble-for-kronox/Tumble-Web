import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteModule } from './favourite/favourite.module';
import { SchoolPickerModule } from './school-picker/school-picker.module';
import { ThemeSwitchModule } from './theme-switch/theme-switch.module';
import { ScheduleIdFormatterPipe } from './pipes/schedule-id-formatter/schedule-id-formatter.pipe';
import { JoinPipe } from './pipes/join/join.pipe';
import { HexOpacityPipe } from './pipes/hex-opacity/hex-opacity.pipe';
import { DualActionItemComponent } from './components/dual-action-item/dual-action-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatIconButtonSizesModule } from 'mat-icon-button-sizes';



@NgModule({
  exports: [
    FavouriteModule,
    SchoolPickerModule,
    ThemeSwitchModule,
    JoinPipe,
    ScheduleIdFormatterPipe,
    HexOpacityPipe,
    DualActionItemComponent
  ],
  declarations: [
    JoinPipe,
    ScheduleIdFormatterPipe,
    HexOpacityPipe,
    DualActionItemComponent
  ],
  imports: [
    CommonModule,
    FavouriteModule,
    SchoolPickerModule,
    ThemeSwitchModule,
    MatIconModule,
    MatIconButtonSizesModule,
    MatButtonModule
  ]
})
export class SharedModule { }
