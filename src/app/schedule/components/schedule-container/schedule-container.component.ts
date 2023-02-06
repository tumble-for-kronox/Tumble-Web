import { Component, HostListener, ViewChild } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { ScheduleResponseHandler } from 'src/app/helpers/backend/response-handlers/ScheduleResponseHandler';
import Schedule from 'src/app/models/scheduling/schedule';
import { SchoolService } from 'src/app/shared/services/school/school.service';
import { EventDetailsContainerComponent } from '../../event-details/event-details-container/event-details-container.component';
import { ColorService } from '../../services/color/color.service';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-container',
  templateUrl: './schedule-container.component.html',
  styleUrls: ['./schedule-container.component.scss']
})
export class ScheduleContainerComponent {
  @ViewChild(EventDetailsContainerComponent) eventDetails!: EventDetailsContainerComponent

  isTempMode: Observable<boolean>
  isLoading: boolean = false
  error?: string
  loadedSchedule: BehaviorSubject<Schedule | null> = new BehaviorSubject<Schedule | null>(null)
  isEmptySchedule: boolean = false

  private currentScheduleUpdate?: Subscription

  constructor(
    private scheduleService: ScheduleService,
    private ts: TranslocoService,
    private schoolService: SchoolService
  ) {
    this.isTempMode = this.scheduleService.tempMode


    this.scheduleService.currentSelectedScheduleIds.subscribe(scheduleIds => {
      if (this.currentScheduleUpdate) {
        this.currentScheduleUpdate.unsubscribe()
        this.isLoading = false
      }

      if (scheduleIds.length > 0) {
        this.loadSchedules(scheduleIds)
      }

      this.loadedSchedule.next(null)
    })

    this.loadedSchedule.subscribe(schedule => {
      if (schedule == null) return

      this.isEmptySchedule = this.scheduleIsEmpty(schedule)
    })
  }

  @HostListener('showEventDetails', ['$event'])
  showEventDetails(event: any) {
    this.eventDetails.showEventDetails(event)
  }

  loadSchedules(scheduleIds: string[]) {
    this.isLoading = true
    this.currentScheduleUpdate = this.scheduleService.fetchSchedules(scheduleIds, this.schoolService.currentSchoolValue).pipe(
      distinctUntilChanged()
    ).subscribe({
      error: (err) => {
        const responseHandler = new ScheduleResponseHandler();
        const errResponse = responseHandler.parseScheduleFetchError(err);

        this.loadedSchedule.next(null)
        this.error = this.ts.translate(errResponse.error!.message)
        console.log(this.error);
        this.isLoading = false
      },
      next: (value) => {
        const scheduleResult = Schedule.fromJson(value.body)
        console.log(scheduleResult)

        this.loadedSchedule.next(scheduleResult)

        this.isLoading = false
      }
    })
  }

  private scheduleIsEmpty(schedule: Schedule): boolean {
    return schedule.days.flatMap(value => {
      return value.events
    }).length <= 0
  }

}
