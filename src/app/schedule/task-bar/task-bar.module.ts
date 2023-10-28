import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskBarContainerComponent } from './task-bar-container/task-bar-container.component';
import { SelectedSchedulesComponent } from './selected-schedules/selected-schedules.component';
import { MatRippleModule } from '@angular/material/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { TempResetComponent } from './temp-reset/temp-reset.component';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    TaskBarContainerComponent,
    SelectedSchedulesComponent,
    TempResetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatRippleModule,
    MatIconModule,
    TranslocoModule,
    RouterModule,
    MatButtonToggleModule
  ],
  exports: [
    TaskBarContainerComponent,
    TempResetComponent
  ]
})
export class TaskBarModule { }
