import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import Endpoints from 'src/app/config/constants/endpoints';
import QueryFields from 'src/app/config/constants/query_fields';
import { timeout } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { SchoolEnum } from 'src/app/models/enums/schools';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

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
