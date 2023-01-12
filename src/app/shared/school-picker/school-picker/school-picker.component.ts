import { Component, OnInit } from '@angular/core';
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
  schools: School[] = schoolList;
  chosenSchool: Observable<School | null>;
  expanded: boolean = false;

  constructor(
    private schoolService: SchoolService
  ) {
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
