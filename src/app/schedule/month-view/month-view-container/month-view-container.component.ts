import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import Schedule from 'src/app/models/scheduling/schedule';

@Component({
  selector: 'schedule-month-view-container',
  templateUrl: './month-view-container.component.html',
  styleUrls: ['./month-view-container.component.scss']
})
export class MonthViewContainerComponent {
  @Input() currentSchedule!: Observable<Schedule | null>
  @Input() smallLayout!: boolean;
}
