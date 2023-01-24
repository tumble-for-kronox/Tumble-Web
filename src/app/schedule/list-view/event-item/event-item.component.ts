import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Self, OnInit } from '@angular/core';
import Event from 'src/app/models/scheduling/event';
import { EventDetailsContainerComponent } from '../../event-details/event-details-container/event-details-container.component';

@Component({
  selector: 'list-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {
  @Input() event!: Event
  @Output() eventSelected = new EventEmitter<{ event: Event, x: number, y: number }>()
  datepipe: DatePipe = new DatePipe('en-US')
  locationTitles?: string[]

  constructor(@Self() private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.locationTitles = this.event.locations.map(value => value.id)
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
