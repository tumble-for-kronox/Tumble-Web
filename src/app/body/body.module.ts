import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarModule } from './side-bar/side-bar.module';
import { BodyContainerComponent } from './components/body-container/body-container.component';
import { ScheduleModule } from '../schedule/schedule.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    BodyContainerComponent
  ],
  exports: [
    SideBarModule
  ],
  imports: [
    CommonModule,
    SideBarModule,
    ScheduleModule,
    TranslocoModule
  ]
})
export class BodyModule { }
