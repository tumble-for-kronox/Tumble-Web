import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import Day from 'src/app/models/scheduling/day';
import Schedule from 'src/app/models/scheduling/schedule';
import { Week } from 'src/app/models/web/week';

@Component({
    selector: 'schedule-list-view-container',
    templateUrl: './list-view-container.component.html',
    styleUrls: ['./list-view-container.component.scss'],
})
export class ListViewContainerComponent {
    @Input() currentColors!: Map<string, string>;
    @Input() currentSchedule!: Observable<Schedule | null>;
    @Input() smallLayout!: boolean;
    parsedSchedule: Week[] = [];

    ngOnInit(): void {
        this.currentSchedule.subscribe((value) => {
            if (!value) return;
            this.parsedSchedule = this.parseScheduleToWeeks(value);
        });
    }

    private parseScheduleToWeeks(schedule: Schedule): Week[] {
        const weekMappedDays = new Map<number, Day[]>();

        for (const day of schedule.days) {
            if (day.events.length <= 0) continue;

            const today = new Date();
            if (!this._isDateDaySameOrAfter(day.isoString, today)) continue;

            if (weekMappedDays.has(day.weekNumber)) {
                weekMappedDays.set(day.weekNumber, [...weekMappedDays.get(day.weekNumber)!, day]);
                continue;
            }

            weekMappedDays.set(day.weekNumber, [day]);
        }

        return [...weekMappedDays.entries()].map((entry) => {
            return new Week(entry[0], entry[1]);
        });
    }

    private _isDateDaySameOrAfter(date1: Date, date2: Date): boolean {
        return date1 >= date2;
    }
}
