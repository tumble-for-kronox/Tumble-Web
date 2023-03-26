import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsContainerComponent } from './event-details-container/event-details-container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';



@NgModule({
  declarations: [
    EventDetailsContainerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    ColorPickerModule
  ],
  exports: [
    EventDetailsContainerComponent
  ]
})
export class EventDetailsModule { }