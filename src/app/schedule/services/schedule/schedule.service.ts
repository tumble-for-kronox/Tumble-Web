import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import Endpoints from 'src/app/config/constants/endpoints';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SchoolEnum } from 'src/app/models/enums/schools';
import { BookmarkService } from 'src/app/shared/services/bookmark/bookmark.service';
import Programme from 'src/app/models/programme';
import Bookmark from 'src/app/models/web/bookmark';
import MultiSchoolSchedules from 'src/app/models/web/schoolSchedules';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private _currentSelectedScheduleIdsSubject: BehaviorSubject<MultiSchoolSchedules[]> = new BehaviorSubject<MultiSchoolSchedules[]>([]);
  private _currentSelectedProgrammesSubject: BehaviorSubject<Programme[]> = new BehaviorSubject<Programme[]>([]);
  private _tempMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentSelectedScheduleIds: Observable<MultiSchoolSchedules[]>;
  public currentSelectedProgrammes: Observable<Programme[]>;

  constructor(private bookmarkService: BookmarkService, private http: HttpClient) {
    this.currentSelectedScheduleIds = this._currentSelectedScheduleIdsSubject.asObservable();
    this.currentSelectedProgrammes = this._currentSelectedProgrammesSubject.asObservable();

    this.bookmarkService.visibleBookmarks.subscribe(bookmarks => {
      if (!this._tempMode.value) {
        this._currentSelectedScheduleIdsSubject.next(this._schoolSchedulesFromBookmarks(bookmarks));
      }
    });

    this._tempMode.subscribe(isTempMode => {
      if (!isTempMode) {
        this._currentSelectedScheduleIdsSubject.next(this._schoolSchedulesFromBookmarks(this.bookmarkService.currentBookmarksValue));
      }
    });
  }

  private _schoolSchedulesFromBookmarks(bookmarks: Bookmark[]): MultiSchoolSchedules[] {
    const scheduleIdsBySchool: { [schoolId in SchoolEnum]: string[] } = {
      [SchoolEnum.NONE]: [],
      [SchoolEnum.HKR]: [],
      [SchoolEnum.MAU]: [],
      [SchoolEnum.ORU]: [],
      [SchoolEnum.LTU]: [],
      [SchoolEnum.HIG]: [],
      [SchoolEnum.SH]: [],
      [SchoolEnum.HV]: [],
      [SchoolEnum.HB]: [],
      [SchoolEnum.MDH]: []
    };

    bookmarks.forEach(bookmark => {
      scheduleIdsBySchool[bookmark.schoolId].push(bookmark.scheduleId);
    });

    const output = Object.entries(scheduleIdsBySchool)
      .filter(([_, scheduleIds]) => scheduleIds.length > 0)
      .map(([schoolId, scheduleIds]) => new MultiSchoolSchedules(
        parseInt(schoolId) as SchoolEnum,
        scheduleIds,
      ));

    return output
  }

  public get currentSchedulesValue(): MultiSchoolSchedules[] {
    return this._currentSelectedScheduleIdsSubject.value;
  }

  public get tempMode(): Observable<boolean> {
    return this._tempMode.asObservable();
  }

  public get tempModeValue(): boolean {
    return this._tempMode.value;
  }

  setTempMode(val: boolean) {
    NgZone
    this._tempMode.next(val);
  }

  setTempSchedules(schoolSchedules: MultiSchoolSchedules[]) {
    this._currentSelectedScheduleIdsSubject.next(schoolSchedules);
  }

  fetchSchedules(schoolSchedules: MultiSchoolSchedules[]): Observable<HttpResponse<Object>> {
    return this.http.post(
      Endpoints.baseUrl + Endpoints.getSchedule,
      schoolSchedules,
      {
        observe: "response"
      }
    )
  }
}
