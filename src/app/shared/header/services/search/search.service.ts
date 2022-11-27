import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Endpoints from '@constants/endpoints';
import QueryFields from '@constants/query_fields';
import { Observable } from 'rxjs/internal/Observable';
import Programme from 'src/app/models/programme';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  submitSearchQuery(schoolId: string, searchQuery: string): Observable<{ count: number, items: Programme[] }> {
    const params = new HttpParams().appendAll({
      [QueryFields.schoolId]: schoolId,
      [QueryFields.searchQuery]: searchQuery
    })

    return this.http.get<{ count: number, items: Programme[] }>(
      Endpoints.debugBaseUrl + Endpoints.search,
      {
        params: params,
        observe: 'body',
        responseType: 'json',
      }
    )
  }
}
