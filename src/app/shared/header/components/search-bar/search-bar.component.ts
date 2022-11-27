import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
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

  constructor(
    private renderer: Renderer2,
    private searchService: SearchService,
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.expanded) return;

      if (e.composedPath().indexOf(this.searchContainer.nativeElement) === -1) {
        this.expanded = false;
      }
    })

    this.renderer.listen('window', 'keyup.escape', (e: Event) => {
      this.searchInputField.nativeElement.blur()
      this.expanded = !this.expanded;
    })
  }

  ngOnInit(): void {
  }

  public get expanded(): boolean {
    return this._expanded;
  }


  public set expanded(v: boolean) {
    this._expanded = v

    setTimeout(() => {
      if (v === false) {
        this.clearSearchResults();
      }
    }, 200)
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

  search() {
    if (this.searchInputField.nativeElement.value.trim() == '') {
      return;
    }

    this.searchService.submitSearchQuery("0", this.searchInputField.nativeElement.value.trim()).subscribe(result => {
      this._resultCount = result.count;
      this._results = result.items;
    });
  }

  clearSearchResults() {
    this._resultCount = undefined;
    this._results = undefined;
  }
}
