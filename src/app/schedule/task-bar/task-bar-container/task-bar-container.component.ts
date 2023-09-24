import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Component({
  selector: 'app-task-bar-container',
  templateUrl: './task-bar-container.component.html',
  styleUrls: ['./task-bar-container.component.scss']
})
export class TaskBarContainerComponent {

  tempMode: Observable<boolean>;


  constructor(
    private scheduleService: ScheduleService
  ) {
    this.tempMode = this.scheduleService.tempMode;
  }
}
