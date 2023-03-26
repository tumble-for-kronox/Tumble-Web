import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyContainerComponent } from './body/components/body-container/body-container.component';
import { ScheduleContainerComponent } from './schedule/components/schedule-container/schedule-container.component';

const routes: Routes = [
  { path: "", component: ScheduleContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
