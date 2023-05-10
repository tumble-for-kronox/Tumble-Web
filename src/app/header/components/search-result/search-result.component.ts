import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { searchQueryParams } from 'src/app/helpers/routing/paramFormatters';
import RoutePaths from 'src/app/helpers/routing/paths';
import { SchoolEnum } from 'src/app/models/enums/schools';
import Programme from 'src/app/models/programme';
import MultiSchoolSchedules from 'src/app/models/web/schoolSchedules';
import { ScheduleService } from 'src/app/schedule/services/schedule/schedule.service';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent implements OnInit {
  @Input() programme!: Programme;
  @Input() schoolId!: SchoolEnum;
  @Output() selectedScheduleEvent = new EventEmitter<void>();

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  private _addScheduleId(schoolId: SchoolEnum, scheduleId: string, schoolSchedules: MultiSchoolSchedules[]): MultiSchoolSchedules[] {
    const existingEntry = schoolSchedules.find(entry => entry.schoolId === schoolId);

    if (existingEntry) {
      const updatedScheduleIds = [...existingEntry.scheduleIds, scheduleId];
      const updatedEntry = new MultiSchoolSchedules(schoolId, updatedScheduleIds);
      return schoolSchedules.map(entry => (entry.schoolId === schoolId ? updatedEntry : entry));
    }

    const newEntry = new MultiSchoolSchedules(schoolId, [scheduleId]);
    return [...schoolSchedules, newEntry];
  }

  addToTempSchedule() {
    const multiSchoolSchedules = this.scheduleService.currentSchedulesValue
    let updatedSchoolSchedules: MultiSchoolSchedules[] = [new MultiSchoolSchedules(this.schoolId, [this.programme.id])]

    if (this.scheduleService.tempModeValue) {
      updatedSchoolSchedules = this._addScheduleId(this.schoolId, this.programme.id, multiSchoolSchedules);
    }

    this.router.navigate([RoutePaths.search], { queryParams: { scheduleIds: searchQueryParams(updatedSchoolSchedules) } });
    this.selectedScheduleEvent.emit();
  }
}
