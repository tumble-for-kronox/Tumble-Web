import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { BackendResponse, BackendResponseStatus } from 'src/app/helpers/backend/BackendResponse';
import { UserResponseHandler } from 'src/app/helpers/backend/response-handlers/UserResponseHandler';
import { SchoolEnum } from 'src/app/models/enums/schools';
import KronoxUser from 'src/app/models/user/kronox_user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SchoolService } from 'src/app/shared/services/school/school.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  error?: string;

  constructor(
    public dialog: MatDialog,
    private ts: TranslocoService,
    private schoolService: SchoolService,
    private authService: AuthService
  ) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async submit() {
    if (this.form.value['username'].trim() == "" || this.form.value['password'].trim() == "") {
      this.error = this.ts.translate('errors.login.empty-fields');
      return;
    }

    if (this.schoolService.currentSchoolValue == SchoolEnum.NONE) {
      this.error = this.ts.translate('errors.login.no-school');
      return;
    }

    this.authService.login(this.schoolService.currentSchoolValue, this.form.value['username'], this.form.value['password']).subscribe({
      error: (err) => {
        const errorHandler = new UserResponseHandler();
        const errResponse = errorHandler.parseLoginError(err);

        this.error = this.ts.translate(errResponse.error!.message);
        return;
      },
      next: (value) => {
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this.dialog.closeAll()
  }
}
