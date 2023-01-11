import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { BackendResponse } from 'src/app/helpers/backend/BackendResponse';
import KronoxUser from 'src/app/models/user/kronox_user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  @Input() error?: string;

  constructor(
    public dialog: MatDialog,
    private ts: TranslocoService,
    private authService: AuthService
  ) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async submit() {
    const response = await this.authService.login(this.form.value['username'], this.form.value['password'])

    if ((response as KronoxUser).name != undefined) {
      this.closeDialog()
      return;
    }

    console.log(this.ts.translate((response as BackendResponse<null>).error!.message))
  }

  closeDialog() {
    this.dialog.closeAll()
  }
}
