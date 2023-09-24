import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthViewContainerComponent } from './month-view-container/month-view-container.component';



@NgModule({
  declarations: [
    MonthViewContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MonthViewContainerComponent
  ]
})
export class MonthViewModule { }
