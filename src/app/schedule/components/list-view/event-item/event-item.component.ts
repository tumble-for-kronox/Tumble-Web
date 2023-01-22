import { Component, Input } from '@angular/core';
import Event from 'src/app/models/scheduling/event';

@Component({
  selector: 'list-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent {
  @Input() event!: Event
}
