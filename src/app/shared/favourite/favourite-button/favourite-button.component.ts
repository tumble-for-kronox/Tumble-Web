import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import Programme from 'src/app/models/programme';
import { ColorService } from 'src/app/schedule/services/color/color.service';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import { SchoolService } from '../../services/school/school.service';
import { SearchService } from 'src/app/header/services/search/search.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.scss']
})
export class FavouriteButtonComponent implements OnInit, OnDestroy {
  @Input() programme!: Programme;
  isBookmarked$!: Subscription;
  isBookmarked: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private bookmarkService: BookmarkService,
    private searchService: SearchService,
    private colorService: ColorService,
  ) { }

  ngOnInit(): void {
    this.isBookmarked$ = this.bookmarkService.isBookmark(this.programme.id).subscribe(value => {
      this.isBookmarked.next(value);
    });
  }

  ngOnDestroy(): void {
    this.isBookmarked$.unsubscribe();
  }

  toggleBookmarked() {
    if (this.isBookmarked.value) {
      this.bookmarkService.deleteBookmark(this.programme.id);
      this.colorService.removeColors(this.programme.id);
      return;
    }

    this.bookmarkService.addBookmark(this.programme.id, this.searchService.currentSchoolValue);
  }
}
