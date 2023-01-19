import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolPickerComponent } from './school-picker/school-picker.component';
import { SchoolOptionComponent } from './school-option/school-option.component';
import { MatRippleModule } from '@angular/material/core';



@NgModule({
  declarations: [
    SchoolPickerComponent,
    SchoolOptionComponent
  ],
  exports: [
    SchoolPickerComponent
  ],
  imports: [
    CommonModule,
    MatRippleModule
  ]
})
export class SchoolPickerModule { }
