import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { searchQueryParams } from 'src/app/helpers/routing/paramFormatters';
import RoutePaths from 'src/app/helpers/routing/paths';
import MultiSchoolSchedules from 'src/app/models/web/schoolSchedules';
import { BookmarkService } from 'src/app/shared/services/bookmark/bookmark.service';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { SearchService } from 'src/app/header/services/search/search.service';
import Bookmark from 'src/app/models/web/bookmark';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selected-schedules',
  templateUrl: './selected-schedules.component.html',
  styleUrls: ['./selected-schedules.component.scss'],
})
export class SelectedSchedulesComponent {
  schedules!: Observable<MultiSchoolSchedules[]>;
  tempMode: Observable<boolean>;
  bookmarks: Observable<Bookmark[]>;
  showSchedulesPopUp: boolean = false;

  constructor(
    private bookmarkService: BookmarkService,
    private scheduleService: ScheduleService,
    private searchService: SearchService,
    private router: Router
  ) {
    this.bookmarks = this.bookmarkService.currentBookmarks;
    this.schedules = this.scheduleService.currentSelectedScheduleIds;
    this.tempMode = this.scheduleService.tempMode;
  }

  private _removeScheduleId(
    scheduleId: string,
    schoolSchedules: MultiSchoolSchedules[]
  ): MultiSchoolSchedules[] {
    return schoolSchedules
      .map((item) => {
        const updatedScheduleIds = item.scheduleIds.filter(
          (id) => id !== scheduleId
        );
        return new MultiSchoolSchedules(item.schoolId, updatedScheduleIds);
      })
      .filter((item) => item.scheduleIds.length > 0);
  }

  toggleSchedulesPopUp() {
    this.showSchedulesPopUp = !this.showSchedulesPopUp;
  }

  getSchedulesFromMultiSchoolSchedule(
    multiSchoolSchedules: MultiSchoolSchedules[] | null
  ): string[] {
    if (!multiSchoolSchedules) return [];

    return multiSchoolSchedules.flatMap((schedule) => schedule.scheduleIds);
  }

  countSchedules(multiSchoolSchedules: MultiSchoolSchedules[] | null): number {
    if (!multiSchoolSchedules) return 0;

    return multiSchoolSchedules.flatMap((schedule) => schedule.scheduleIds)
      .length;
  }

  addBookmark(scheduleId: string) {
    if (this.isBookmarked(scheduleId)) {
      this.bookmarkService.deleteBookmark(scheduleId);
      return;
    }

    this.bookmarkService.addBookmark(
      scheduleId,
      this.searchService.currentSchoolValue
    );
  }

  removeTempScheduleId(scheduleId: string) {
    const multiSchedules = this.scheduleService.currentSchedulesValue;

    const scheduleIds = multiSchedules.reduce(
      (accumulator, value) => accumulator.concat(value.scheduleIds),
      [] as string[]
    );

    if (scheduleIds.length <= 1) {
      this.router.navigate([RoutePaths.home]);
      return;
    }

    const updatedScheduleIds = this._removeScheduleId(
      scheduleId,
      multiSchedules
    );
    this.router.navigate([RoutePaths.search], {
      queryParams: { scheduleIds: searchQueryParams(updatedScheduleIds) },
    });
  }

  isBookmarked(scheduleId: string): boolean {
    return this.bookmarkService.isBookmarkValue(scheduleId);
  }
}
