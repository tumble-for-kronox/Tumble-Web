import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountContainerComponent } from './account/account-container/account-container.component';
import { BodyContainerComponent } from './body/components/body-container/body-container.component';
import { ScheduleContainerComponent } from './schedule/components/schedule-container/schedule-container.component';
import { AccountGuard } from './shared/guards/account.guard';
import RoutePaths from './helpers/routing/paths';

const routes: Routes = [
  { path: RoutePaths.home, component: ScheduleContainerComponent, title: "Home" },
  { path: RoutePaths.search, component: ScheduleContainerComponent, title: "Search Schedules" },
  { path: RoutePaths.account, component: AccountContainerComponent, title: "Account", canActivate: [AccountGuard] },
  { path: "**", redirectTo: RoutePaths.home }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AccountGuard]
})
export class AppRoutingModule { }
