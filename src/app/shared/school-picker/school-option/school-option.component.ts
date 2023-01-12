import { Component, EventEmitter, Input, Output } from '@angular/core';
import { School } from 'src/app/models/school';

@Component({
  selector: 'school-option',
  templateUrl: './school-option.component.html',
  styleUrls: ['./school-option.component.scss']
})
export class SchoolOptionComponent {
  @Input() school!: School;
  @Output() chosenSchoolEvent = new EventEmitter<School>();

  chooseSchool() {
    this.chosenSchoolEvent.emit(this.school);
  }
}
