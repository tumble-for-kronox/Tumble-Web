import { Component, ElementRef, EventEmitter, Input, Output, Self, OnInit } from '@angular/core';
import { School } from 'src/app/models/school';

@Component({
  selector: 'school-option',
  templateUrl: './school-option.component.html',
  styleUrls: ['./school-option.component.scss']
})
export class SchoolOptionComponent implements OnInit {
  @Input() school: School | undefined;
  @Output() chosenSchoolEvent = new EventEmitter<School>();
  wideLayout!: boolean;

  constructor(@Self() private element: ElementRef) { }

  ngOnInit(): void {
    this.wideLayout = this.element.nativeElement.offsetWidth > 300;
  }

  chooseSchool() {
    this.chosenSchoolEvent.emit(this.school);
  }
}
