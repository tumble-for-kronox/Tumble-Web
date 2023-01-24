import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsContainerComponent } from './event-details-container/event-details-container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EventDetailsContainerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  exports: [
    EventDetailsContainerComponent
  ]
})
export class EventDetailsModule { }
