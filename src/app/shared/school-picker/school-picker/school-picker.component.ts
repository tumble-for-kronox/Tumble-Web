import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map, Observable } from 'rxjs';
import { SchoolEnum } from 'src/app/models/enums/schools';
import { School, schoolList } from 'src/app/models/school';
import { SchoolService } from '../../services/school/school.service';

@Component({
  selector: 'school-picker',
  templateUrl: './school-picker.component.html',
  styleUrls: ['./school-picker.component.scss']
})
export class SchoolPickerComponent implements OnInit {
  @ViewChild('schoolPickerContainer') schoolPickerContainer!: ElementRef

  @Input() chosenSchool!: SchoolEnum
  @Output() change: EventEmitter<SchoolEnum> = new EventEmitter<SchoolEnum>();

  schools: School[] = schoolList;
  filteredSchools: School[] = schoolList;
  expanded: boolean = false;

  constructor(
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.expanded) return;

      if (e.composedPath().indexOf(this.schoolPickerContainer.nativeElement) === -1) {
        this.expanded = false;
      }
    })

    this.renderer.listen('window', 'keyup.escape', (_e: Event) => {
      this.expanded = false;
    })
  }

  ngOnInit(): void {
  }


  public get schoolValue(): School | undefined {
    return this.schools.find(school => school.id == this.chosenSchool);
  }


  changeSchool(school: School | undefined) {
    this.expanded = false;
    if (school === undefined) {
      this.change.emit(SchoolEnum.NONE);
      return;
    }

    this.change.emit(school.id);
  }

  schoolSelected(): boolean {
    return this.chosenSchool != SchoolEnum.NONE
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
