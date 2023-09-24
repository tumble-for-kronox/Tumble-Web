import { Component, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfToday } from 'date-fns';
import { Observable } from 'rxjs';
import Schedule from 'src/app/models/scheduling/schedule';

@Component({
  selector: 'schedule-week-view-container',
  templateUrl: './week-view-container.component.html',
  styleUrls: ['./week-view-container.component.scss']
})
export class WeekViewContainerComponent {
  @Input() currentSchedule!: Observable<Schedule | null>;
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
