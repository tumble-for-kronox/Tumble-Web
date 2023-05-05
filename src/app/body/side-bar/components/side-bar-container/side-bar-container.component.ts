import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SchoolEnum } from 'src/app/models/enums/schools';
import { Bookmark } from 'src/app/models/web/bookmark';
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
  scheduleIds: Observable<string[]>;
  currentSchool: Observable<SchoolEnum>;
  tempMode: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private bookmarkService: BookmarkService,
    private scheduleService: ScheduleService,
    private schoolService: SchoolService,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((state: BreakpointState) => {
      this.smallLayout = state.matches;
    })

    this.bookmarks = this.bookmarkService.currentBookmarks;
    this.scheduleIds = this.scheduleService.currentSelectedScheduleIds;
    this.currentSchool = this.schoolService.currentSchool;
    this.tempMode = this.scheduleService.tempMode;
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

    this.bookmarkService.addBookmark(scheduleId, this.schoolService.currentSchoolValue)
  }

  removeTempScheduleId(scheduleId: string) {
    const scheduleIds = this.scheduleService.currentSchedulesValue;
    console.log(scheduleIds.length)
    if (scheduleIds.length <= 1) {
      this.router.navigate(['home']);
      return;
    }

    const scheduleIdx = scheduleIds.indexOf(scheduleId);
    this.scheduleService.currentSchedulesValue.splice(scheduleIdx, 1);
    this.router.navigate(['search'], { queryParams: { scheduleIds: scheduleIds.join(',') } });
  }

  isBookmarked(scheduleId: string): boolean {
    return this.bookmarkService.isBookmarkValue(scheduleId);
  }
}
