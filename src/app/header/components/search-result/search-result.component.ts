import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import Programme from 'src/app/models/programme';
import { ScheduleService } from 'src/app/schedule/services/schedule/schedule.service';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent implements OnInit {
  @Input() programme!: Programme;
  @Output() selectedScheduleEvent = new EventEmitter<void>()

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
  }

  addToTempSchedule() {
    if (!this.scheduleService.tempModeValue) {
      this.scheduleService.toggleTempMode()
    }
    this.scheduleService.addTempSchedule(this.programme.id)
    this.selectedScheduleEvent.emit()
  }
}
