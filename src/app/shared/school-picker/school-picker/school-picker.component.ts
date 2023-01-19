import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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

  chosenSchool: Observable<School | null>;
  schools: School[] = schoolList;
  filteredSchools: School[] = schoolList;
  expanded: boolean = false;

  constructor(
    private renderer: Renderer2,
    private schoolService: SchoolService
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

    this.chosenSchool = this.schoolService.currentSchool.pipe(
      map(school => {
        if (school == SchoolEnum.NONE) {
          return null
        }

        for (const entry of this.schools) {
          if (entry.id == school) {
            return entry;
          }
        }

        return null;
      })
    )
  }

  ngOnInit(): void {
    this.schoolService.currentSchool.subscribe(value => {
      if (value == null) this.filteredSchools = schoolList;

      this.filteredSchools = schoolList.filter(school => {
        return school.id !== value
      })
    })
  }

  changeSchool(school: School | undefined) {
    console.log(`change shool to: ${school?.shortName}`)
    this.expanded = false;
    if (school === undefined) {
      this.schoolService.changeSchool(SchoolEnum.NONE);
      return;
    }

    this.schoolService.changeSchool(school.id);
  }

  schoolSelected() {
    return this.schoolService.schoolChosen;
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
