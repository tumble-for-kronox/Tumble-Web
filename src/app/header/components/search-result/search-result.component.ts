import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  addToTempSchedule() {
    let scheduleIds = this.route.snapshot.queryParamMap.getAll('scheduleIds')
    scheduleIds.push(this.programme.id)
    this.router.navigate(['search'], { queryParams: { scheduleIds: scheduleIds.join(',') } })

    this.selectedScheduleEvent.emit()
  }
}
