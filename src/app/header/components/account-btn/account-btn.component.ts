import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import KronoxUser from 'src/app/models/user/kronox_user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'account-btn',
  templateUrl: './account-btn.component.html',
  styleUrls: ['./account-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountBtnComponent implements OnInit {
  loggedIn?: Observable<boolean>

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.loggedIn = authService.loggedIn
  }

  ngOnInit(): void {
  }

  openLoginDialog() {
    this.dialog.open(LoginModalComponent, { panelClass: 'login-modal-container' })
  }

  openUserPage() {
    this.authService.logout()
  }

  // loggedIn(): Boolean {
  //   return this.authService.currentUser.subscribe(value => {
  //     value != null
  //   }
  //   );
  // }

  getCurrentUser(): KronoxUser {
    return this.authService.currentUserValue!;
  }
}
