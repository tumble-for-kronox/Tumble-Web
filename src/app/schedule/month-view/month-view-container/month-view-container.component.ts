import { Component, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfToday } from 'date-fns';
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
  viewDate: Date = startOfToday();
  events: CalendarEvent[] = [];

  ngOnInit(): void {
    this.currentSchedule.subscribe(schedule => {
      if (!schedule)
        this.events = [];

      this.events = schedule!.days.flatMap(day => day.events).map(scheduleEvent => {
        return <CalendarEvent>{
          ...scheduleEvent,
          start: scheduleEvent.from,
          end: scheduleEvent.to,
          color: {
            primary: "#fcba03",
            secondary: "#ffd45e"
          }
        };
      })
    })
  }
}
