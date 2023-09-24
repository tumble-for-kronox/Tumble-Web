import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarContainerComponent } from './components/side-bar-container/side-bar-container.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButtonSizesModule } from 'mat-icon-button-sizes';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolPickerModule } from 'src/app/shared/school-picker/school-picker.module';
import { SideBarSectionComponent } from './components/side-bar-section/side-bar-section.component';
import { SideBarItemComponent } from './components/side-bar-item/side-bar-item.component';



@NgModule({
  declarations: [
    SideBarContainerComponent,
    SideBarSectionComponent,
    SideBarItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslocoModule,
    MatButtonModule,
    MatIconModule,
    MatIconButtonSizesModule,
    SchoolPickerModule
  ],
  exports: [
    SideBarContainerComponent
  ]
})
export class SideBarModule { }
