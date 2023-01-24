import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewContainerComponent } from './list-view-container/list-view-container.component';
import { WeekItemComponent } from './week-item/week-item.component';
import { DayItemComponent } from './day-item/day-item.component';
import { EventItemComponent } from './event-item/event-item.component';
import { MatRippleModule } from '@angular/material/core';
import { EventDetailsModule } from '../event-details/event-details.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListViewContainerComponent,
    WeekItemComponent,
    DayItemComponent,
    EventItemComponent
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    EventDetailsModule,
    SharedModule
  ],
  exports: [
    ListViewContainerComponent
  ]
})
export class ListViewModule { }
