import { Component, Input } from '@angular/core';
import Day from 'src/app/models/scheduling/day';

@Component({
  selector: 'list-day-item',
  templateUrl: './day-item.component.html',
  styleUrls: ['./day-item.component.scss']
})
export class DayItemComponent {
  @Input() day!: Day
}
