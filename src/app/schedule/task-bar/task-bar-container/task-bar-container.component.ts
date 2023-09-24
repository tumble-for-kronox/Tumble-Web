import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { ScheduleView, scheduleViewValues } from 'src/app/models/enums/scheduleView';

@Component({
  selector: 'app-task-bar-container',
  templateUrl: './task-bar-container.component.html',
  styleUrls: ['./task-bar-container.component.scss']
})
export class TaskBarContainerComponent {

  @Input() scheduleView!: ScheduleView;
  @Output() scheduleViewChange = new EventEmitter<ScheduleView>();
  tempMode: Observable<boolean>;
  scheduleViewValues = scheduleViewValues;

  constructor(
    private scheduleService: ScheduleService
  ) {
    this.tempMode = this.scheduleService.tempMode;
  }

  viewChanged(value: ScheduleView) {
    console.log(value);
    this.scheduleViewChange.emit(value);
  }
}
