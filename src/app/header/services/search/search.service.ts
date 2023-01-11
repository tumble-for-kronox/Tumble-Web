import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import Endpoints from '@constants/endpoints';
import QueryFields from '@constants/query_fields';
import { timeout } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  submitSearchQuery(schoolId: string, searchQuery: string): Observable<HttpResponse<Object>> {
    const params = new HttpParams().appendAll({
      [QueryFields.schoolId]: schoolId,
      [QueryFields.searchQuery]: searchQuery
    })

    return this.http.get(
      Endpoints.debugBaseUrl + Endpoints.search,
      {
        params: params,
        observe: 'response',
      }
    )
  }
}
