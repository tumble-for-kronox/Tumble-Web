import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import Endpoints from 'src/app/config/constants/endpoints';
import QueryFields from 'src/app/config/constants/query_fields';
import { BehaviorSubject, map, timeout } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { SchoolEnum } from 'src/app/models/enums/schools';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private currentSchoolSubject: BehaviorSubject<SchoolEnum>;
  public currentSchool: Observable<SchoolEnum>;
  public schoolChosen: Observable<boolean>;

  constructor(private http: HttpClient, private storageService: StorageService) {
    const storedSchool = storageService.getSearchSchool();

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
    this.storageService.setSearchSchool(chosenSchool);
    this.currentSchoolSubject.next(chosenSchool);
  }

  submitSearchQuery(schoolId: SchoolEnum, searchQuery: string): Observable<HttpResponse<Object>> {
    const params = new HttpParams().appendAll({
      [QueryFields.schoolId]: schoolId,
      [QueryFields.searchQuery]: searchQuery
    })

    return this.http.get(
      Endpoints.baseUrl + Endpoints.search,
      {
        params: params,
        observe: 'response',
      }
    )
  }
}
