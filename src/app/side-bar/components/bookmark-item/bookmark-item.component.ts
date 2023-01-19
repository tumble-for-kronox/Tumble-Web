import { Component, Input } from '@angular/core';
import { Bookmark } from 'src/app/models/web/bookmark';
import { BookmarkService } from 'src/app/shared/services/bookmark/bookmark.service';

@Component({
  selector: 'bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss']
})
export class BookmarkItemComponent {
  @Input() bookmark!: Bookmark;

  constructor(private bookmarkService: BookmarkService) { }

  deleteBookmark() {
    this.bookmarkService.deleteBookmark(this.bookmark.programme.id);
  }

  toggleVisible() {
    this.bookmarkService.toggleBookmarkVisibility(this.bookmark.programme.id);
  }
}
