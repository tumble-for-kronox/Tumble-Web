import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarContainerComponent } from './components/side-bar-container/side-bar-container.component';
import { BookmarksContainerComponent } from './components/bookmarks-container/bookmarks-container.component';
import { TranslocoModule } from '@ngneat/transloco';
import { BookmarkItemComponent } from './components/bookmark-item/bookmark-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButtonSizesModule } from 'mat-icon-button-sizes';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolPickerModule } from 'src/app/shared/school-picker/school-picker.module';



@NgModule({
  declarations: [
    SideBarContainerComponent,
    BookmarksContainerComponent,
    BookmarkItemComponent
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
