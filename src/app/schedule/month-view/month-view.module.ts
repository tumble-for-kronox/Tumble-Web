import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthViewContainerComponent } from './month-view-container/month-view-container.component';
import { CalendarMonthModule } from 'angular-calendar';



@NgModule({
  declarations: [
    MonthViewContainerComponent
  ],
  imports: [
    CommonModule,
    CalendarMonthModule
  ],
  exports: [
    MonthViewContainerComponent
  ]
})
export class MonthViewModule { }
