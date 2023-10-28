import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SearchService } from 'src/app/header/services/search/search.service';
import { searchQueryParams } from 'src/app/helpers/routing/paramFormatters';
import RoutePaths from 'src/app/helpers/routing/paths';
import { SchoolEnum } from 'src/app/models/enums/schools';
import Bookmark from 'src/app/models/web/bookmark';
import MultiSchoolSchedules from 'src/app/models/web/schoolSchedules';
import { ScheduleService } from 'src/app/schedule/services/schedule/schedule.service';
import { BookmarkService } from 'src/app/shared/services/bookmark/bookmark.service';
import { SchoolService } from 'src/app/shared/services/school/school.service';

@Component({
  selector: 'app-side-bar-container',
  templateUrl: './side-bar-container.component.html',
  styleUrls: ['./side-bar-container.component.scss']
})
export class SideBarContainerComponent {
  @Input() expanded!: boolean;
  smallLayout!: boolean;
  bookmarks: Observable<Bookmark[]>;
  multiSchoolSchedules: Observable<MultiSchoolSchedules[]>;
  tempMode: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private bookmarkService: BookmarkService,
    private scheduleService: ScheduleService,
    private searchService: SearchService,
    private router: Router,
  ) {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((state: BreakpointState) => {
      this.smallLayout = state.matches;
    })

    this.bookmarks = this.bookmarkService.currentBookmarks;
    this.multiSchoolSchedules = this.scheduleService.currentSelectedScheduleIds;
    this.tempMode = this.scheduleService.tempMode;
  }

  private _removeScheduleId(scheduleId: string, schoolSchedules: MultiSchoolSchedules[]): MultiSchoolSchedules[] {
    return schoolSchedules.map(item => {
      const updatedScheduleIds = item.scheduleIds.filter(id => id !== scheduleId);
      return new MultiSchoolSchedules(item.schoolId, updatedScheduleIds);
    }).filter(item => item.scheduleIds.length > 0);
  }

  deleteBookmark(bookmark: Bookmark) {
    this.bookmarkService.deleteBookmark(bookmark.scheduleId);
  }

  toggleVisible(bookmark: Bookmark) {
    this.bookmarkService.toggleBookmarkVisibility(bookmark.scheduleId);
  }

  addBookmark(scheduleId: string) {
    if (this.isBookmarked(scheduleId)) {
      this.bookmarkService.deleteBookmark(scheduleId)
      return
    }

    this.bookmarkService.addBookmark(scheduleId, this.searchService.currentSchoolValue)
  }

  removeTempScheduleId(scheduleId: string) {
    const multiSchedules = this.scheduleService.currentSchedulesValue;

    const scheduleIds = multiSchedules.reduce((accumulator, value) => accumulator.concat(value.scheduleIds), ([] as string[]))

    if (scheduleIds.length <= 1) {
      this.router.navigate([RoutePaths.home]);
      return;
    }

    const updatedScheduleIds = this._removeScheduleId(scheduleId, multiSchedules);
    this.router.navigate([RoutePaths.search], { queryParams: { scheduleIds: searchQueryParams(updatedScheduleIds) } });
  }

  isBookmarked(scheduleId: string): boolean {
    return this.bookmarkService.isBookmarkValue(scheduleId);
  }
}
