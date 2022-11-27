import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';



@NgModule({
  exports: [
    HeaderModule
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
