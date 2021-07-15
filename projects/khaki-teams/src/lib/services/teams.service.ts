import {Inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {SortDirection} from '@angular/material/sort';
import { TeamMembersSm } from '../state/models/team-members-sm';
import { StatisticsQueryParameters } from './models/statistics-query-parameters';
import { Moment } from 'moment';
import { PersonSm } from '../state/models/person-sm';
import { MeetingsListSm } from '../state/models/meetings-list-sm';

@Logging
@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  logger: HistorianService;

  constructor(private httpClient: HttpClient, @Inject('environment') private environment) {
  }

  private getStartEndUrl(start: Moment, end: Moment): string {
    const formattedStart = start.utc().format();
    const formattedEnd = end.utc().format();
    const url = `${this.environment.khakiBff}/employees/statistics/${formattedStart}/${formattedEnd}`;
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
      let url = this.getStartEndUrl(start, end);

      return this.httpClient
        .get<TeamMembersSm>(url, {params})
        .pipe(tap(data => this.logger.debug('employee list', data)));

  }

  getPerson(
    id: string
  ): Observable<PersonSm> {
    let params = new HttpParams();
    this.logger.debug('person ID', id);
    const url = `${this.environment.khakiBff}/persons/id/${id}`;
    return this.httpClient
      .get(url, {params})
      .pipe(
        tap(personData => this.logger.debug('person response', personData)),
        catchError(
          error => {
            this.logger.debug('Failed to get person', error);
            return throwError('Failed to get person');
          }
        ),
        map(personData => personData as PersonSm)
      );
  }

  private getNonStatisticsStartEndUrl(start: Moment, end: Moment, statName: string): string {
    const formattedStart = start.utc().format();
    const formattedEnd = end.utc().format();
    const url = `${this.environment.khakiBff}/${statName}/${formattedStart}/${formattedEnd}`;
    return url;
  }

  getMeetingsList(
    start: Moment,
    end: Moment,
    organizer: string,
    attendee: string,
    statisticsQueryParams: StatisticsQueryParameters
  ): Observable<MeetingsListSm> {
    let params = new HttpParams();
    const page = statisticsQueryParams.page ? statisticsQueryParams.page.toString() : '0';
    const count = statisticsQueryParams.count ? statisticsQueryParams.count.toString() : '5';
    const sortColumn = statisticsQueryParams.sortColumn ?? 'start';
    const sortDirection: SortDirection = statisticsQueryParams.sortDirection ?? 'asc';
    params = params.set('page', page);
    params = params.set('count', count);
    params = params.set('sort', `${sortColumn},${sortDirection}`);
    params = params.set('organizer', '');
    params = params.set('attendee', attendee);
    const url = this.getNonStatisticsStartEndUrl(start, end, 'calendar-events');
    return this.httpClient
      .get(url, {params})
      .pipe(
        tap(meetingsData => this.logger.debug('calendar-events response', meetingsData)),
        catchError(
          error => {
            this.logger.debug('Failed to get calendar-events', error);
            return throwError('Failed to get calendar-events');
          }
        ),
        map(meetingsListData => meetingsListData as MeetingsListSm)
      );

  }

}
