import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempResetComponent } from './task-bar/temp-reset/temp-reset.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleContainerComponent } from './components/schedule-container/schedule-container.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListViewModule } from './list-view/list-view.module';
import { EventDetailsModule } from './event-details/event-details.module';
import { RouterModule } from '@angular/router';
import { TaskBarModule } from './task-bar/task-bar.module';



@NgModule({
  declarations: [
    ScheduleContainerComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    MatIconModule,
    ListViewModule,
    MatProgressSpinnerModule,
    EventDetailsModule,
    RouterModule,
    TaskBarModule
  ],
  exports: [
    ScheduleContainerComponent,
    TempResetComponent
  ]
})
export class ScheduleModule { }
