import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarModule } from './side-bar/side-bar.module';
import { BodyContainerComponent } from './components/body-container/body-container.component';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BodyContainerComponent
  ],
  exports: [
    SideBarModule,
    BodyContainerComponent
  ],
  imports: [
    CommonModule,
    SideBarModule,
    TranslocoModule,
    RouterModule
  ]
})
export class BodyModule { }
