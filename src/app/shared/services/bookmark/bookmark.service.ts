import { Injectable } from '@angular/core';
import StorageKeys from 'src/app/config/constants/storage_keys';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SchoolEnum } from 'src/app/models/enums/schools';
import Programme from 'src/app/models/programme';
import Bookmark from 'src/app/models/web/bookmark';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private currentBookmarksSubject: BehaviorSubject<Bookmark[]> = new BehaviorSubject<Bookmark[]>([]);
  public currentBookmarks: Observable<Bookmark[]>;
  public visibleBookmarks: Observable<Bookmark[]>;

  constructor() {
    let storedBookmarks = localStorage.getItem(StorageKeys.savedBookmarks);

    if (storedBookmarks === "undefined" || storedBookmarks === null) {
      this.currentBookmarksSubject.next([]);
    } else {
      this.currentBookmarksSubject.next(this.bookmarkArrayFromJson(JSON.parse(storedBookmarks)));
    }

    this.currentBookmarks = this.currentBookmarksSubject.asObservable();
    this.visibleBookmarks = this.currentBookmarksSubject.pipe(
      map(value => {
        return value.filter(bookmark => bookmark.visible)
      })
    )
  }

  public get currentBookmarksValue(): Bookmark[] {
    return this.currentBookmarksSubject.getValue();
  }

  public isBookmark(scheduleId: string): Observable<boolean> {
    return this.currentBookmarksSubject.pipe(
      map(value => {
        return value.some(bookmark => bookmark.scheduleId == scheduleId);
      })
    );
  }

  public isBookmarkValue(scheduleId: string): boolean {
    return this.currentBookmarksValue.some(bookmark => {
      return bookmark.scheduleId == scheduleId;
    });
  }

  public addBookmark(scheduleId: string, schoolId: SchoolEnum) {
    let currentBookmarks = this.currentBookmarksValue;
    currentBookmarks.push(new Bookmark(scheduleId, true, schoolId));

    this.updateBookmarksValue(currentBookmarks);
  }

  public deleteBookmark(scheduleId: string) {
    let currentBookmarks = this.currentBookmarksValue;
    const itemIndex = currentBookmarks.findIndex(bookmark => bookmark.scheduleId == scheduleId);
    if (itemIndex <= -1) return;

    currentBookmarks.splice(itemIndex, 1);

    this.updateBookmarksValue(currentBookmarks);
  }

  public clearBookmarks() {
    this.updateBookmarksValue([]);
  }

  public toggleBookmarkVisibility(scheduleId: string) {
    let currentBookmarks = this.currentBookmarksValue;
    const itemIndex = currentBookmarks.findIndex(bookmark => bookmark.scheduleId == scheduleId);
    if (itemIndex <= -1) return;

    (currentBookmarks[itemIndex] as Bookmark).toggleVisible();
    this.updateBookmarksValue(currentBookmarks);
  }

  private updateBookmarksValue(newValue: Bookmark[]) {
    localStorage.setItem(StorageKeys.savedBookmarks, JSON.stringify(newValue));
    this.currentBookmarksSubject.next(newValue);
  }

  private bookmarkArrayFromJson(json: object[]): Bookmark[] {
    return json.map(value => Bookmark.fromJson(value))
  }
}
