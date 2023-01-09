import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'account-btn',
  templateUrl: './account-btn.component.html',
  styleUrls: ['./account-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountBtnComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(LoginModalComponent, { panelClass: 'login-modal-container' })
  }

}
