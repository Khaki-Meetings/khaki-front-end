import {Inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {SortDirection} from '@angular/material/sort';
import { TeamMembersSm } from '../state/models/team-members-sm';
import { StatisticsQueryParameters } from './models/statistics-query-parameters';

@Logging
@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  logger: HistorianService;

  constructor(private httpClient: HttpClient, @Inject('environment') private environment) {
  }

  getEmployees(statisticsQueryParams: StatisticsQueryParameters): Observable<TeamMembersSm> {

      let params = new HttpParams();

      const page = statisticsQueryParams.page ? statisticsQueryParams.page.toString() : '0';
      const count = statisticsQueryParams.count ? statisticsQueryParams.count.toString() : '5';
      const sortColumn = statisticsQueryParams.sortColumn ?? 'person.lastName';
      const sortDirection: SortDirection = statisticsQueryParams.sortDirection ?? 'desc';
      params = params.set('page', page);
      params = params.set('count', count);
      params = params.set('sort', `${sortColumn},${sortDirection}`);

      let url = `${this.environment.khakiBff}/employees`;

      return this.httpClient
        .get<TeamMembersSm>(url, {params})
        .pipe(tap(data => this.logger.debug('employee list', data)));

  }

}
