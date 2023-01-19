import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import Programme from 'src/app/models/programme';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent implements OnInit {
  @Input() programme!: Programme;

  constructor() { }

  ngOnInit(): void {
  }
}
