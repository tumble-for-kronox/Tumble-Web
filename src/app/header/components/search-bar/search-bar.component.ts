import { Component, ElementRef, OnInit, Renderer2, ViewChild, OnDestroy, Input } from '@angular/core';
import Programme from 'src/app/models/programme';
import { SearchService } from '../../services/search/search.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { ProgrammeResponseHandler } from 'src/app/helpers/backend/response-handlers/ProgrammeResponseHandler';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { SchoolService } from 'src/app/shared/services/school/school.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @ViewChild('inputField') searchInputField!: ElementRef<HTMLInputElement>;
  @ViewChild('searchContainer') searchContainer!: ElementRef;

  @Input() minimized: boolean = false;

  expanded: boolean = false;
  private _resultCount?: number;
  private _results?: Programme[];
  private _$isSchoolSelected: Subscription
  loading: boolean = false;
  isSchoolSelected: boolean = false;

  constructor(
    private renderer: Renderer2,
    private searchService: SearchService,
    private schoolService: SchoolService,
    private matSnackBar: MatSnackBar,
    private ts: TranslocoService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.minimized) return;

      if (!this.expanded) return;

      if (e.composedPath().indexOf(this.searchContainer.nativeElement) === -1) {
        this.expanded = false;
      }
    })

    this.renderer.listen('window', 'keyup.escape', (_e: Event) => {
      this.searchInputField.nativeElement.blur()
      this.expanded = false;
    })

    this._$isSchoolSelected = schoolService.schoolChosen.subscribe(value => {
      this.isSchoolSelected = value;
    })
  }

  ngOnInit(): void {
    console.log(this.minimized)
  }

  ngOnDestroy(): void {
    this._$isSchoolSelected.unsubscribe();
  }

  public get resultCount() {
    return this._resultCount;
  }

  public get results() {
    return this._results;
  }

  openMinimizedSearch() {
    this.expanded = true
  }

  closeMinimizedSearch() {
    this.expanded = false
  }

  clearSearchInput(): void {
    const inputField = this.searchInputField.nativeElement;
    if (this.minimized && inputField.value == '') {
      this.closeMinimizedSearch()
    }

    // this.expanded = false
    inputField.value = '';
    inputField.focus();
    this.clearSearchResults();
  }

  onScheduleSelected() {
    this.searchInputField.nativeElement.blur()
    this.searchInputField.nativeElement.value = ''
    this.expanded = false;
    this.clearSearchResults()
  }

  dynamicSearch() {
    let inputLength = this.searchInputField.nativeElement.value.trim().length;
    if (this.isInputTooShortToTriggerSearch(inputLength)) {
      this.clearSearchResults();
      this.loading = false;
      return;
    }

    this.search();
  }

  async search() {
    if (this.textFieldEmpty()) {
      return;
    }

    if (!this.isSchoolSelected) {
      return;
    }

    this.loading = true;

    this.searchService.submitSearchQuery(this.schoolService.currentSchoolValue, this.searchInputField.nativeElement.value.trim())
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe({
        error: (err) => {
          const responseHandler = new ProgrammeResponseHandler();

          const errResponse = responseHandler.parseSearchError(err);

          this.matSnackBar.open(this.ts.translate(errResponse.error!.message), this.ts.translate('general.dismiss'), {
            panelClass: ['snackbar-error']
          });
          this.loading = false;
        },
        next: (value) => {
          const result = value.body as { count: number, items: Programme[] };

          this._resultCount = result.count;
          this._results = result.items;
          this.loading = false;
        }
      });
  }

  private textFieldEmpty(): Boolean {
    return this.searchInputField.nativeElement.value.trim() == '';
  }

  private isInputTooShortToTriggerSearch(inputLength: number): Boolean {
    return inputLength <= 3
  }

  private clearSearchResults() {
    this._resultCount = undefined;
    this._results = undefined;
  }
}
