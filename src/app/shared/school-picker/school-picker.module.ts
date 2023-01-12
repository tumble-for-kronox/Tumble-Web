import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolPickerComponent } from './school-picker/school-picker.component';
import { SchoolOptionComponent } from './school-option/school-option.component';



@NgModule({
  declarations: [
    SchoolPickerComponent,
    SchoolOptionComponent
  ],
  exports: [
    SchoolPickerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SchoolPickerModule { }
