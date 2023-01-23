import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Self, ViewChild } from '@angular/core';
import Event from 'src/app/models/scheduling/event';
import { EventDetailsContainerComponent } from '../../event-details/event-details-container/event-details-container.component';

@Component({
  selector: 'list-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent {
  @Input() event!: Event
  @Output() eventSelected = new EventEmitter<{ event: Event, x: number, y: number }>()
  datepipe: DatePipe = new DatePipe('en-US')

  constructor(@Self() private elementRef: ElementRef) {

  }

  showEventDetails(mouseEvent: MouseEvent) {
    const event: CustomEvent = new CustomEvent('showEventDetails', {
      bubbles: true,
      detail: {
        event: this.event,
        x: mouseEvent.clientX,
        y: mouseEvent.clientY
      }
    })

    this.elementRef.nativeElement.dispatchEvent(event)
  }
}
