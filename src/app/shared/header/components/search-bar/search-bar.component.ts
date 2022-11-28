import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import BackendStrings from '@constants/backend_strings';
import { Http2ServerResponse } from 'http2';
import Programme from 'src/app/models/programme';
import { SearchService } from '../../services/search/search.service';

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
  loading: boolean = false;

  constructor(
    private renderer: Renderer2,
    private searchService: SearchService,
    private matSnackBar: MatSnackBar
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.expanded) return;

      if (e.composedPath().indexOf(this.searchContainer.nativeElement) === -1) {
        this.expanded = false;
      }
    })

    this.renderer.listen('window', 'keyup.escape', (e: Event) => {
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

  dynamicSearch() {
    let inputLength = this.searchInputField.nativeElement.value.trim().length;
    if (inputLength <= 3) {
      this.clearSearchResults();

      return;
    }

    this.search();
  }

  search() {
    if (this.searchInputField.nativeElement.value.trim() == '') {
      return;
    }

    this.loading = true;

    this.searchService.submitSearchQuery("0", this.searchInputField.nativeElement.value.trim()).subscribe(
      {
        next: (result: HttpResponse<Object>) => {
          console.log(result);

          if (!result.ok) {
            let body = result.body as { error: string };

            this.matSnackBar.open(body.error, 'Dismiss', {
              panelClass: ['snackbar-error']
            });

            this.loading = false;
            return;
          }

          let body = result.body as { count: number, items: Programme[] }
          if (result.status == 204) {
            body = {
              count: 0,
              items: [],
            }
          }

          this._resultCount = body.count;
          this._results = body.items;

          this.loading = false;
        },
        error: (_: any) => {
          this.matSnackBar.open(BackendStrings.timeOutError, 'Dismiss', {
            panelClass: ['snackbar-error']
          });
          this.loading = false;
        }
      }
    );
  }

  clearSearchResults() {
    this._resultCount = undefined;
    this._results = undefined;
  }
}
