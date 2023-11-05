import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Self,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import {
  BehaviorSubject,
  distinctUntilChanged,
  Observable,
  Subscription,
} from 'rxjs';
import { ScheduleResponseHandler } from 'src/app/helpers/backend/response-handlers/ScheduleResponseHandler';
import Schedule from 'src/app/models/scheduling/schedule';
import { EventDetailsContainerComponent } from '../../event-details/event-details-container/event-details-container.component';
import { ScheduleService } from '../../services/schedule/schedule.service';
import MultiSchoolSchedules from 'src/app/models/web/schoolSchedules';
import { SchoolEnum } from 'src/app/models/enums/schools';
import RoutePaths from 'src/app/helpers/routing/paths';
import {
  ScheduleView,
  scheduleViewValues,
} from 'src/app/models/enums/scheduleView';

@Component({
  selector: 'app-schedule-container',
  templateUrl: './schedule-container.component.html',
  styleUrls: ['./schedule-container.component.scss'],
})
export class ScheduleContainerComponent implements OnDestroy {
  @ViewChild(EventDetailsContainerComponent)
  eventDetails!: EventDetailsContainerComponent;

  isTempMode: Observable<boolean>;
  isLoading: boolean = false;
  error?: string;
  loadedSchedule: BehaviorSubject<Schedule | null> =
    new BehaviorSubject<Schedule | null>(null);
  isEmptySchedule: boolean = false;
  smallLayout: boolean;
  scheduleView: ScheduleView = ScheduleView.SCHEDULE;
  scheduleViewValues = scheduleViewValues;

  private _currentScheduleUpdateSubscription?: Subscription;
  private _currentSelectedScheduleIdsSubscription: Subscription;

  constructor(
    private scheduleService: ScheduleService,
    private ts: TranslocoService,
    private route: ActivatedRoute,
    @Self() element: ElementRef
  ) {
    this.route.queryParamMap.subscribe((paramMap) => {
      if (this.route.snapshot.url[0].path == RoutePaths.search) {
        this.scheduleService.setTempMode(true);
        this.scheduleService.setTempSchedules(
          this._schoolSchedulesFromPath(paramMap.getAll('scheduleIds'))
        );
      } else {
        this.scheduleService.setTempMode(false);
      }
    });

    this._currentSelectedScheduleIdsSubscription =
      this.scheduleService.currentSelectedScheduleIds.subscribe(
        (scheduleIds) => {
          console.log('NEW SCHEDULES');

          if (this._currentScheduleUpdateSubscription) {
            this._currentScheduleUpdateSubscription.unsubscribe();
            this.isLoading = false;
          }

          if (scheduleIds.length > 0) {
            this.loadSchedules(scheduleIds);
          }

          this.loadedSchedule.next(null);
        }
      );

    this.loadedSchedule.subscribe((schedule) => {
      if (schedule == null) return;

      this.isEmptySchedule = this.scheduleIsEmpty(schedule);
    });

    this.isTempMode = this.scheduleService.tempMode;

    if (element.nativeElement.offsetWidth <= 800) {
      this.smallLayout = true;
    } else {
      this.smallLayout = false;
    }
  }

  ngOnDestroy(): void {
    this._currentScheduleUpdateSubscription?.unsubscribe();
    this._currentSelectedScheduleIdsSubscription.unsubscribe();
  }

  private _schoolSchedulesFromPath(
    scheduleIdParams: string[]
  ): MultiSchoolSchedules[] {
    return scheduleIdParams.map((entry) => {
      const entryValues = entry.split(',');
      return new MultiSchoolSchedules(
        parseInt(entryValues[0]) as SchoolEnum,
        entryValues.slice(1)
      );
    });
  }

  @HostListener('showEventDetails', ['$event'])
  showEventDetails(event: any) {
    this.eventDetails.showEventDetails(event);
  }

  loadSchedules(schoolSchedules: MultiSchoolSchedules[]) {
    this.isLoading = true;
    this._currentScheduleUpdateSubscription = this.scheduleService
      .fetchSchedules(schoolSchedules)
      .pipe(distinctUntilChanged())
      .subscribe({
        error: (err) => {
          console.log(err);
          const responseHandler = new ScheduleResponseHandler();
          const errResponse = responseHandler.parseScheduleFetchError(err);

          this.loadedSchedule.next(null);
          this.error = this.ts.translate(errResponse.error!.message);
          this.isLoading = false;
        },
        next: (value) => {
          const scheduleResult = Schedule.fromJson(value.body);
          this.loadedSchedule.next(scheduleResult);
          this.isLoading = false;
        },
      });
  }

  private scheduleIsEmpty(schedule: Schedule): boolean {
    return (
      schedule.days.flatMap((value) => {
        return value.events;
      }).length <= 0
    );
  }
}
