import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import Programme from 'src/app/models/programme';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import { SchoolService } from '../../services/school/school.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.scss']
})
export class FavouriteButtonComponent implements OnInit {
  @Input() programme!: Programme;
  isBookmarked$!: Subscription;
  isBookmarked: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private bookmarkService: BookmarkService, private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.isBookmarked$ = this.bookmarkService.isBookmark(this.programme.id).subscribe(value => {
      this.isBookmarked.next(value);
    });
  }

  toggleBookmarked() {
    if (this.isBookmarked.value) {
      this.bookmarkService.deleteBookmark(this.programme.id);
      console.log("Should be false: " + this.isBookmarked.value);
      return;
    }

    this.bookmarkService.addBookmark(this.programme, this.schoolService.currentSchoolValue);
    console.log("Should be true: " + this.isBookmarked.value);
  }
}
