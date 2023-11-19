import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Week } from 'src/app/models/web/week';

@Component({
    selector: 'list-week-item',
    templateUrl: './week-item.component.html',
    styleUrls: ['./week-item.component.scss'],
})
export class WeekItemComponent {
    @Input() currentColors!: Map<string, string>;
    @Input() week!: Week;
    @Input() smallLayout!: boolean;
}
