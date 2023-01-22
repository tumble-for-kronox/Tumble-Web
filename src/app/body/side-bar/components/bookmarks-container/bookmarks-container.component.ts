import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookmark } from 'src/app/models/web/bookmark';
import { BookmarkService } from 'src/app/shared/services/bookmark/bookmark.service';

@Component({
  selector: 'bookmarks-container',
  templateUrl: './bookmarks-container.component.html',
  styleUrls: ['./bookmarks-container.component.scss']
})
export class BookmarksContainerComponent {
  bookmarks: Observable<Bookmark[]>

  constructor(private bookmarkService: BookmarkService) {
    this.bookmarks = bookmarkService.currentBookmarks;
  }
}
