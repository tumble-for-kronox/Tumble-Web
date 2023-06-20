import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { UserResponseHandler } from 'src/app/helpers/backend/response-handlers/UserResponseHandler';
import { SchoolEnum } from 'src/app/models/enums/schools';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SchoolService } from 'src/app/shared/services/school/school.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  selectedSchool: SchoolEnum = SchoolEnum.NONE;
  error?: string;

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
    if (
      this.form.value['username'].trim() == '' ||
      this.form.value['password'].trim() == ''
    ) {
      this.error = this.ts.translate('errors.login.empty-fields');
      return;
    }

    if (this.selectedSchool == SchoolEnum.NONE) {
      this.error = this.ts.translate('errors.login.no-school');
      return;
    }

    this.authService
      .login(
        this.selectedSchool,
        this.form.value['username'],
        this.form.value['password']
      )
      .subscribe({
        error: (err) => {
          const errorHandler = new UserResponseHandler();
          const errResponse = errorHandler.parseLoginError(err);

          this.error = this.ts.translate(errResponse.error!.message);
          return;
        },
        next: (value) => {
          this.closeDialog();
        },
      });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  updateSchoolVal(value: SchoolEnum) {
    console.log(`CHANGE SCHOOL VAL: ${this.selectedSchool}`)
    this.selectedSchool = value;
  }
}
