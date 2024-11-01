import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import Day from 'src/app/models/scheduling/day';

@Component({
    selector: 'list-day-item',
    templateUrl: './day-item.component.html',
    styleUrls: ['./day-item.component.scss'],
})
export class DayItemComponent {
    datepipe: DatePipe = new DatePipe('en-US');

    @Input() currentColors!: Map<string, string>;
    @Input() day!: Day;
    @Input() smallLayout!: boolean;
}
