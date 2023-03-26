import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Self, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import Event from 'src/app/models/scheduling/event';
import { BookmarkService } from 'src/app/shared/services/bookmark/bookmark.service';
import { EventDetailsContainerComponent } from '../../event-details/event-details-container/event-details-container.component';
import { ColorService } from '../../services/color/color.service';

@Component({
  selector: 'list-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {
  @Input() event!: Event
  @Input() smallLayout!: boolean
  @Output() eventSelected = new EventEmitter<{ event: Event, x: number, y: number }>()
  datepipe: DatePipe = new DatePipe('en-US')
  locationTitles?: string[]

  constructor(@Self() private elementRef: ElementRef, private colorService: ColorService) { }

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

  getEventColor(): Observable<string | undefined> {
    return this.colorService.currentColors.pipe(
      map(value => {
        let color = value.get(this.event.course.id);

        if (!color) {
          color = this.colorService.randomColor();
          this.colorService.updateSingleColor(this.event.course.id, color);
        }

        if (this.event.isSpecial) {
          color = this.colorService.specialEventColor;
        }

        return color;
      })
    )
  }
}
