import { Component, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfToday, startOfTomorrow } from 'date-fns';
import { Observable } from 'rxjs';
import Schedule from 'src/app/models/scheduling/schedule';
import { HexOpacityPipe } from 'src/app/shared/pipes/hex-opacity/hex-opacity.pipe';

@Component({
    selector: 'schedule-week-view-container',
    templateUrl: './week-view-container.component.html',
    styleUrls: ['./week-view-container.component.scss'],
})
export class WeekViewContainerComponent {
    @Input() currentColors!: Map<string, string>;
    @Input() currentSchedule!: Observable<Schedule | null>;
    @Input() smallLayout!: boolean;
    viewDate: Date = startOfToday();
    events: CalendarEvent[] = [];

    constructor() {}

    ngOnInit(): void {
        const hexOpacityPipe = new HexOpacityPipe();

        this.currentSchedule.subscribe((schedule) => {
            if (!schedule) this.events = [];

            this.events = schedule!.days
                .flatMap((day) => day.events)
                .map((scheduleEvent) => {
                    const eventColor = this.currentColors.get(scheduleEvent.course.id);

                    return <CalendarEvent>{
                        ...scheduleEvent,
                        start: scheduleEvent.from,
                        end: scheduleEvent.to,
                        color: {
                            primary: hexOpacityPipe.transform(eventColor),
                            secondary: hexOpacityPipe.transform(eventColor, 0.05),
                        },
                    };
                });
        });
    }
}
