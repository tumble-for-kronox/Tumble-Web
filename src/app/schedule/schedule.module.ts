import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempResetComponent } from './components/temp-reset/temp-reset.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleContainerComponent } from './components/schedule-container/schedule-container.component';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { ListViewModule } from './components/list-view/list-view.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    TempResetComponent,
    ScheduleContainerComponent,
    WeekViewComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    MatIconModule,
    ListViewModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ScheduleContainerComponent
  ]
})
export class ScheduleModule { }
