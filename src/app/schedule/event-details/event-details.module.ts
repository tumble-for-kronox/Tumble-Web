import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsContainerComponent } from './event-details-container/event-details-container.component';



@NgModule({
  declarations: [
    EventDetailsContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventDetailsContainerComponent
  ]
})
export class EventDetailsModule { }
