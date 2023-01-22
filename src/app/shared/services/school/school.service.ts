import { Injectable } from '@angular/core';
import StorageKeys from '@constants/storage_keys';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SchoolEnum } from 'src/app/models/enums/schools';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private currentSchoolSubject: BehaviorSubject<SchoolEnum>;
  public currentSchool: Observable<SchoolEnum>;
  public schoolChosen: Observable<boolean>;

  constructor() {
    let storedSchool = localStorage.getItem(StorageKeys.savedSchool);

    this.currentSchoolSubject = storedSchool === "undefined" || storedSchool === null ?
      new BehaviorSubject<SchoolEnum>(SchoolEnum.NONE) :
      new BehaviorSubject<SchoolEnum>(parseInt(storedSchool!) as SchoolEnum)

    this.currentSchool = this.currentSchoolSubject.asObservable();
    this.schoolChosen = this.currentSchoolSubject.pipe(
      map(value => {
        console.log(`SCHOOL CHOSEN UPDATED TO: ${value != SchoolEnum.NONE}`)
        return value != SchoolEnum.NONE
      })
    )
  }

  public get currentSchoolValue(): SchoolEnum {
    return this.currentSchoolSubject.value;
  }

  public changeSchool(chosenSchool: SchoolEnum) {
    localStorage.setItem(StorageKeys.savedSchool, chosenSchool.toString())
    this.currentSchoolSubject.next(chosenSchool);
  }
}
