import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SchoolEnum } from 'src/app/models/enums/schools';
import Bookmark from 'src/app/models/web/bookmark';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private currentBookmarksSubject: BehaviorSubject<Bookmark[]> = new BehaviorSubject<Bookmark[]>([]);
  public currentBookmarks: Observable<Bookmark[]>;
  public visibleBookmarks: Observable<Bookmark[]>;

  constructor(private storageService: StorageService) {
    const storedBookmarks = storageService.getBookmarks();

    this.currentBookmarksSubject.next(storedBookmarks);
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
    this.storageService.setBookmarks(newValue);
    this.currentBookmarksSubject.next(newValue);
  }

  private bookmarkArrayFromJson(json: object[]): Bookmark[] {
    return json.map(value => Bookmark.fromJson(value))
  }
}
