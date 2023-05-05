import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import Endpoints from 'src/app/config/constants/endpoints';
import QueryFields from 'src/app/config/constants/query_fields';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SchoolEnum } from 'src/app/models/enums/schools';
import { BookmarkService } from 'src/app/shared/services/bookmark/bookmark.service';
import Programme from 'src/app/models/programme';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private _currentSelectedScheduleIdsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _currentSelectedProgrammesSubject: BehaviorSubject<Programme[]> = new BehaviorSubject<Programme[]>([]);
  private _tempMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentSelectedScheduleIds: Observable<string[]>;
  public currentSelectedProgrammes: Observable<Programme[]>;

  constructor(private bookmarkService: BookmarkService, private http: HttpClient) {
    this.currentSelectedScheduleIds = this._currentSelectedScheduleIdsSubject.asObservable()
    this.currentSelectedProgrammes = this._currentSelectedProgrammesSubject.asObservable()

    this.bookmarkService.visibleBookmarks.subscribe(value => {
      if (!this._tempMode.value) {
        this._currentSelectedScheduleIdsSubject.next(value.map(bookmark => bookmark.scheduleId))
      }
    })

    this._tempMode.subscribe(isTempMode => {
      if (!isTempMode) {
        this._currentSelectedScheduleIdsSubject.next(this.bookmarkService.currentBookmarksValue.map(bookmark => bookmark.scheduleId))
      }
    })
  }

  public get currentSchedulesValue(): string[] {
    return this._currentSelectedScheduleIdsSubject.value
  }

  public get tempMode(): Observable<boolean> {
    return this._tempMode.asObservable()
  }

  public get tempModeValue(): boolean {
    return this._tempMode.value
  }

  setTempMode(val: boolean) {
    NgZone
    this._tempMode.next(val)
  }

  setTempSchedules(scheduleIds: string[]) {
    this._currentSelectedScheduleIdsSubject.next(scheduleIds)
  }

  fetchSchedules(scheduleIds: string[], schoolId: SchoolEnum): Observable<HttpResponse<Object>> {
    let params = new HttpParams().append(QueryFields.schoolId, schoolId)
    for (const id of scheduleIds) {
      params = params.append(QueryFields.scheduleIds, id)
    }

    return this.http.get(
      Endpoints.baseUrl + Endpoints.getSchedule,
      {
        params: params,
        observe: "response",
      }
    )
  }
}
