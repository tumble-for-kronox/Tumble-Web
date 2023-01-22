import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import Programme from 'src/app/models/programme';
import { SearchService } from '../../services/search/search.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { ProgrammeResponseHandler } from 'src/app/helpers/backend/response-handlers/ProgrammeResponseHandler';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, firstValueFrom, lastValueFrom, Observable, Subscriber, takeUntil } from 'rxjs';
import { BackendResponseStatus } from 'src/app/helpers/backend/BackendResponse';
import { SchoolService } from 'src/app/shared/services/school/school.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {


  @ViewChild('inputField') searchInputField!: ElementRef<HTMLInputElement>;
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  private _expanded: boolean = false;
  private _resultCount?: number;
  private _results?: Programme[];
  loading: boolean = false

  constructor(
    private renderer: Renderer2,
    private searchService: SearchService,
    private schoolService: SchoolService,
    private matSnackBar: MatSnackBar,
    private ts: TranslocoService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.expanded) return;

      if (e.composedPath().indexOf(this.searchContainer.nativeElement) === -1) {
        this.expanded = false;
      }
    })

    this.renderer.listen('window', 'keyup.escape', (_e: Event) => {
      this.searchInputField.nativeElement.blur()
      this.expanded = false;
    })
  }

  ngOnInit(): void {
  }

  public get expanded(): boolean {
    return this._expanded;
  }


  public set expanded(v: boolean) {
    this._expanded = v
  }

  public get resultCount() {
    return this._resultCount;
  }

  public get results() {
    return this._results;
  }

  clearSearchInput(): void {
    const inputField = this.searchInputField.nativeElement;
    inputField.value = '';
    inputField.focus();
    this.clearSearchResults();
  }

  onScheduleSelected() {
    this.searchInputField.nativeElement.blur()
    this.searchInputField.nativeElement.value = ''
    this._expanded = false;
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
