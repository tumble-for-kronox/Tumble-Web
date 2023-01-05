import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'account-btn',
  templateUrl: './account-btn.component.html',
  styleUrls: ['./account-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountBtnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
