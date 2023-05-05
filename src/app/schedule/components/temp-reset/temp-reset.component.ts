import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScheduleResponseHandler } from 'src/app/helpers/backend/response-handlers/ScheduleResponseHandler';
import Schedule from 'src/app/models/scheduling/schedule';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Component({
  selector: 'schedule-temp-reset',
  templateUrl: './temp-reset.component.html',
  styleUrls: ['./temp-reset.component.scss']
})
export class TempResetComponent {
  constructor() { }
}
