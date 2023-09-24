import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarWeekModule } from 'angular-calendar';
import { WeekViewContainerComponent } from './week-view-container/week-view-container.component';



@NgModule({
  declarations: [
    WeekViewContainerComponent
  ],
  imports: [
    CommonModule,
    CalendarWeekModule
  ],
  exports: [
    WeekViewContainerComponent
  ]
})
export class WeekViewModule { }
