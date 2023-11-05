import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { SchoolEnum } from 'src/app/models/enums/schools';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss'],
})
export class HeaderContainerComponent implements OnInit, OnDestroy {
  public showLargeSearch!: boolean;
  public showSmallSearch!: boolean;
  currSchoolValue!: SchoolEnum;
  _currSchoolSubscription!: Subscription;

  @Input() expandedSideBar!: boolean;
  @Output() expandedEvent = new EventEmitter<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private searchService: SearchService
  ) {
    this._currSchoolSubscription = this.searchService.currentSchool.subscribe(
      (value) => {
        this.currSchoolValue = value;
      }
    );
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 800px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showLargeSearch = false;
          this.showSmallSearch = true;
        } else {
          this.showLargeSearch = true;
          this.showSmallSearch = false;
        }
      });
  }

  ngOnDestroy(): void {
    this._currSchoolSubscription.unsubscribe();
  }

  toggleExpandedSidebar() {
    this.expandedEvent.emit();
  }

  changeSchool(school: SchoolEnum) {
    this.searchService.changeSchool(school);
  }
}
