import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLogoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
