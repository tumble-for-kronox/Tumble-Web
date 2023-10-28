import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SchoolEnum } from 'src/app/models/enums/schools';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private currentSchoolSubject: BehaviorSubject<SchoolEnum>;
  public currentSchool: Observable<SchoolEnum>;
  public schoolChosen: Observable<boolean>;

  constructor(private storageService: StorageService) {
    let storedSchool = storageService.getSchool();

    this.currentSchoolSubject = new BehaviorSubject<SchoolEnum>(storedSchool);

    this.currentSchool = this.currentSchoolSubject.asObservable();
    this.schoolChosen = this.currentSchoolSubject.pipe(
      map(value => {
        return value != SchoolEnum.NONE
      })
    )
  }

  public get currentSchoolValue(): SchoolEnum {
    return this.currentSchoolSubject.value;
  }

  public changeSchool(chosenSchool: SchoolEnum) {
    this.storageService.setSchool(chosenSchool);
    this.currentSchoolSubject.next(chosenSchool);
  }
}
