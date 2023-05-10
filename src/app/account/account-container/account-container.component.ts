import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import RoutePaths from 'src/app/helpers/routing/paths';
import KronoxUser from 'src/app/models/user/kronox_user';
import { ScheduleService } from 'src/app/schedule/services/schedule/schedule.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.scss']
})
export class AccountContainerComponent {
  currentUser!: KronoxUser


  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      if (url[0].path == RoutePaths.search) {
        this.scheduleService.setTempMode(true)
      } else {
        this.scheduleService.setTempMode(false)
      }
    })

    this.authService.currentUser.subscribe(user => {
      this.currentUser = user!;
    })
  }
}
