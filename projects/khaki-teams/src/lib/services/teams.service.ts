import {Inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {SortDirection} from '@angular/material/sort';
import { TeamMembersSm } from '../state/models/team-members-sm';
import { StatisticsQueryParameters } from './models/statistics-query-parameters';
import { Moment } from 'moment';

@Logging
@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  logger: HistorianService;

  constructor(private httpClient: HttpClient, @Inject('environment') private environment) {
  }

  private getStartEndUrl(start: Moment, end: Moment): string {
    this.logger.debug('start', start);
    this.logger.debug('start.utc', start.utcOffset());
    this.logger.debug('start.utc', start.utc().format());
    const formattedStart = start.utc().format();
    const formattedEnd = end.utc().format();
    const url = `${this.environment.khakiBff}/employees/statistics/${formattedStart}/${formattedEnd}`;
    this.logger.debug('url is', url);
    return url;
  }

  getEmployees(
    start: Moment,
    end: Moment,
    statisticsQueryParams: StatisticsQueryParameters): Observable<TeamMembersSm> {

      let params = new HttpParams();

      const page = statisticsQueryParams.page ? statisticsQueryParams.page.toString() : '0';
      const count = statisticsQueryParams.count ? statisticsQueryParams.count.toString() : '5';
      const department = statisticsQueryParams.department;
      const sortColumn = statisticsQueryParams.sortColumn ?? 'person.lastName';
      const sortDirection: SortDirection = statisticsQueryParams.sortDirection ?? 'desc';
      params = params.set('page', page);
      params = params.set('count', count);
      params = params.set('sort', `${sortColumn},${sortDirection}`);
      params = params.set('department', department);
      params = params.set('filter', statisticsQueryParams.statisticsScope.toString());
      this.logger.debug('getEmployees start/end', start, end);
      let url = this.getStartEndUrl(start, end);

      return this.httpClient
        .get<TeamMembersSm>(url, {params})
        .pipe(tap(data => this.logger.debug('employee list', data)));

  }

}
