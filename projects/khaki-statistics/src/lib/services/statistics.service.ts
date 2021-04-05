import {Inject, Injectable} from '@angular/core';
import {Observable, throwError, zip} from 'rxjs';
import {TimeBlockSummarySm} from '../state/models/time-block-summary-sm';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TimeBlockSummaryResponseDto} from './models/time-block-summary-response-dto';
import {catchError, map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {OrganizersStatisticsSm} from '../state/models/organizers-statistics-sm';
import {MeetingsListSm} from '../state/models/meetings-list-sm';
import {TrailingStatisticsResponseDto} from './models/trailing-statistics-response-dto';
import {TrailingStatisticsSm} from '../state/models/trailing-statistics-sm';
import * as momentJs from 'moment';
import {DepartmentsStatisticsResponseDto} from './models/departments-statistics-response-dto';
import {DepartmentsStatisticsSm} from '../state/models/departments-statistics-sm';
import {StatisticsQueryParameters} from './models/statistics-query-parameters';
import {IntervalSe} from '../state/statistics-filters/interval-se.enum';
import Moment = momentJs.Moment;
import {SortDirection} from '@angular/material/sort';
import { OrganizerSm } from '../state/models/organizer-sm';
import { PersonSm } from '../state/models/person-sm';
import {TimeBlockSummaryAggSm} from '../state/models/time-block-summary-agg-sm';
import {DepartmentsStatisticsAggSm} from '../state/models/departments-statistics-agg-sm';
import {StatisticsScopeSe} from '../state/statistics-filters/statistics-scope-se.enum';
import {TrailingStatisticsAggSm} from '../state/models/trailing-statistics-agg-sm';
import { OrganizersAggregateStatisticsSm } from '../state/models/organizers-aggregate-statistics-sm';
import { TimeBlockSummaryGoalsResponseDto } from './models/time-block-summary-goals-response-dto';
import { TimeBlockSummaryGoalListSm } from '../state/models/time-block-summary-goal-list-sm';

@Logging
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  logger: HistorianService;

  constructor(private httpClient: HttpClient, @Inject('environment') private environment) {
  }

  private getStartEndUrl(start: Moment, end: Moment, statName: string): string {
    this.logger.debug('start', start);
    this.logger.debug('start.utc', start.utcOffset());
    this.logger.debug('start.utc', start.utc().format());
    const formattedStart = start.utc().format();
    const formattedEnd = end.utc().format();
    const url = `${this.environment.khakiBff}/statistics/${statName}/${formattedStart}/${formattedEnd}`;
    this.logger.debug('url is', url);
    return url;
  }

  getOrganizersStatistics(
    start: Moment,
    end: Moment,
    statisticsQueryParams: StatisticsQueryParameters
  ): Observable<OrganizersStatisticsSm> {
    let params = new HttpParams();
    this.logger.debug('statisticsQueryParams', statisticsQueryParams);
    const page = statisticsQueryParams.page ? statisticsQueryParams.page.toString() : '0';
    const count = statisticsQueryParams.count ? statisticsQueryParams.count.toString() : '5';
    const sortColumn = statisticsQueryParams.sortColumn ?? 'totalMeetings';
    const sortDirection: SortDirection = statisticsQueryParams.sortDirection ?? 'desc';
    params = params.set('page', page);
    params = params.set('count', count);
    params = params.set('sort', `${sortColumn},${sortDirection}`);
    params = params.set('filter', statisticsQueryParams.statisticsScope.toString());
    this.logger.debug('organizers params', params);
    this.logger.debug('organizers params.keys', params.keys());
    this.logger.debug('start/end', start, end);
    const url = this.getStartEndUrl(start, end, 'organizers');
    this.logger.debug('organizersStatistics url', url, params.toString());
    return this.httpClient
      .get(url, {params})
      .pipe(
        tap(organizersData => this.logger.debug('organizersStatistics response', organizersData)),
        catchError(
          error => {
            this.logger.debug('Failed to get organizers statistics', error);
            return throwError('Failed to get organizers statistics');
          }
        ),
        map(organizersStatisticsData => organizersStatisticsData as OrganizersStatisticsSm)
      );
  }

  getAggregateOrganizersStatistics(
    start: Moment,
    end: Moment,
    statisticsQueryParams: StatisticsQueryParameters
  ): Observable<OrganizersAggregateStatisticsSm> {
    let params = new HttpParams();
    this.logger.debug('statisticsQueryParams', statisticsQueryParams);
    const page = statisticsQueryParams.page ? statisticsQueryParams.page.toString() : '0';
    const count = statisticsQueryParams.count ? statisticsQueryParams.count.toString() : '5';
    const sortColumn = statisticsQueryParams.sortColumn ?? 'internalMeetingCount';
    const sortDirection: SortDirection = statisticsQueryParams.sortDirection ?? 'desc';
    params = params.set('page', page);
    params = params.set('count', count);
    params = params.set('sort', `${sortColumn},${sortDirection}`);
    this.logger.debug('organizers agg params', params);
    this.logger.debug('organizers agg params.keys', params.keys());
    this.logger.debug('start/end', start, end);
    const url = this.getStartEndUrl(start, end, 'organizers/aggregate');
    this.logger.debug('organizersStatistics agg url', url, params.toString());
    return this.httpClient
      .get(url, {params})
      .pipe(
        tap(organizersData => this.logger.debug('organizersStatistics agg response', organizersData)),
        catchError(
          error => {
            this.logger.debug('Failed to get organizers agg statistics', error);
            return throwError('Failed to get organizers agg statistics');
          }
        ),
        map(organizersStatisticsData => organizersStatisticsData as OrganizersAggregateStatisticsSm)
      );
  }

  getTrailingStatisticsScoped(
    start: Moment,
    interval: IntervalSe,
    statisticsQueryParams: StatisticsQueryParameters
  ): Observable<TrailingStatisticsSm> {
    let params = new HttpParams();
    params = params.set('filter', statisticsQueryParams.statisticsScope.toString());
    const intervalCount = 12;
    const formattedStart = start.utc().format();
    const url = `${this.environment.khakiBff}/statistics/trailing/${formattedStart}/${interval}/${intervalCount}`;
    this.logger.debug('trailing url', url);

    return this.httpClient
      .get(url, {params})
      .pipe(
        tap(trailingData => this.logger.debug('Server response: trailing', trailingData)),
        catchError(
          error => {
            this.logger.debug('Server response: trailing', error);
            return throwError('Failed to get trailing statistics');
          }
        ),
        map(
          (trailingStatisticsResponseDto: TrailingStatisticsResponseDto) => trailingStatisticsResponseDto as TrailingStatisticsSm
        ),
      );
  }

  getTrailingStatistics(
    start: Moment,
    interval: IntervalSe,
    statisticsQueryParams: StatisticsQueryParameters
  ): Observable<TrailingStatisticsAggSm> {

    statisticsQueryParams.statisticsScope = StatisticsScopeSe.Internal;
    let o1: Observable<TrailingStatisticsSm> = this.getTrailingStatisticsScoped(start, interval, statisticsQueryParams);

    statisticsQueryParams.statisticsScope = StatisticsScopeSe.External;
    let o2: Observable<TrailingStatisticsSm> = this.getTrailingStatisticsScoped(start, interval, statisticsQueryParams);

    return zip(o1, o2)
      .pipe<TrailingStatisticsAggSm>(map(x => {
        let trailingStatisticsAggSm : TrailingStatisticsAggSm = {
          internal : x[0],
          external : x[1]
        };
        console.log("trailingStatistics: " + JSON.stringify(trailingStatisticsAggSm));
        return trailingStatisticsAggSm;
    }));

  }

  getDepartmentStatisticsScoped(
    start: Moment,
    end: Moment,
    statisticsQueryParams: StatisticsQueryParameters
  ): Observable<DepartmentsStatisticsSm> {
    let params = new HttpParams();
    params = params.set('filter', statisticsQueryParams.statisticsScope.toString());
    return this.httpClient
      .get(this.getStartEndUrl(start, end, 'department'), {params})
      .pipe(
        tap(departmentData => this.logger.debug('Server response: department', departmentData)),
        catchError(
          error => {
            this.logger.debug('Failed to get department statistics', error);
            return throwError('Failed to get department statistics');
          }
        ),
        map((departmentsStatistics: DepartmentsStatisticsResponseDto) => departmentsStatistics as DepartmentsStatisticsSm)
      );
    }

  getDepartmentStatistics(
    start: Moment,
    end: Moment,
    statisticsQueryParams: StatisticsQueryParameters
  ): Observable<DepartmentsStatisticsAggSm> {

    statisticsQueryParams.statisticsScope = StatisticsScopeSe.Internal;
    let o1: Observable<DepartmentsStatisticsSm> = this.getDepartmentStatisticsScoped(start, end, statisticsQueryParams);

    statisticsQueryParams.statisticsScope = StatisticsScopeSe.External;
    let o2: Observable<DepartmentsStatisticsSm> = this.getDepartmentStatisticsScoped(start, end, statisticsQueryParams);

    return zip(o1, o2)
      .pipe<DepartmentsStatisticsAggSm>(map(x => {
        let departmentsStatisticsAggSm : DepartmentsStatisticsAggSm = {
          internal : x[0],
          external : x[1]
        };
        return departmentsStatisticsAggSm;
    }));

  }

  getTimeBlockSummaryScoped(start: Moment, end: Moment, statisticsQueryParams: StatisticsQueryParameters):
    Observable<TimeBlockSummarySm> {
    let params = new HttpParams();
    params = params.set('filter', statisticsQueryParams.statisticsScope.toString());
    return this.httpClient
      .get(this.getStartEndUrl(start, end, 'summary'), {params})
      .pipe(
        tap(summaryData => this.logger.debug('Server response: summary', summaryData)),
        catchError(
          error => {
            this.logger.debug('Failed to get time block summary', error);
            return throwError('Failed to get time block summary');
          }
        ),
        map(
          (timeBlockSummary: TimeBlockSummaryResponseDto) => {
            timeBlockSummary.averageStaffSeconds = 0;
            if (timeBlockSummary.meetingCount && timeBlockSummary.meetingCount !== 0) {
              timeBlockSummary.averageStaffSeconds = timeBlockSummary.totalSeconds / timeBlockSummary.meetingCount;
            }
            return timeBlockSummary;
          }
        )
      );

    }

    getTimeBlockSummary(start: Moment, end: Moment, statisticsQueryParams: StatisticsQueryParameters):
        Observable<TimeBlockSummarySm> {

        statisticsQueryParams.statisticsScope = StatisticsScopeSe.Internal;
        let o1: Observable<TimeBlockSummarySm> = this.getTimeBlockSummaryScoped(start, end, statisticsQueryParams);

        statisticsQueryParams.statisticsScope = StatisticsScopeSe.External;
        let o2: Observable<TimeBlockSummarySm> = this.getTimeBlockSummaryScoped(start, end, statisticsQueryParams);

        return zip(o1, o2)
          .pipe<TimeBlockSummaryAggSm>(map(x => {
            let timeBlockSummaryAggSm : TimeBlockSummaryAggSm = {
              internal : x[0],
              external : x[1]
            };
            return timeBlockSummaryAggSm;
        }));

  }

  private getNonStatisticsStartEndUrl(start: Moment, end: Moment, statName: string): string {
    this.logger.debug('start', start);
    this.logger.debug('start.utc', start.utcOffset());
    this.logger.debug('start.utc', start.utc().format());
    const formattedStart = start.utc().format();
    const formattedEnd = end.utc().format();
    const url = `${this.environment.khakiBff}/${statName}/${formattedStart}/${formattedEnd}`;
    this.logger.debug('url is', url);
    return url;
  }

  getMeetingsList(
    start: Moment,
    end: Moment,
    organizer: string,
    statisticsQueryParams: StatisticsQueryParameters
  ): Observable<MeetingsListSm> {
    let params = new HttpParams();
    this.logger.debug('statisticsQueryParams', statisticsQueryParams);
    const page = statisticsQueryParams.page ? statisticsQueryParams.page.toString() : '0';
    const count = statisticsQueryParams.count ? statisticsQueryParams.count.toString() : '5';
    const sortColumn = statisticsQueryParams.sortColumn ?? 'start';
    const sortDirection: SortDirection = statisticsQueryParams.sortDirection ?? 'asc';
    params = params.set('page', page);
    params = params.set('count', count);
    params = params.set('sort', `${sortColumn},${sortDirection}`);
    params = params.set('organizer', organizer);
    this.logger.debug('meetings params', params);
    this.logger.debug('meetings params.keys', params.keys());
    this.logger.debug('start/end', start, end);
    const url = this.getNonStatisticsStartEndUrl(start, end, 'calendar-events');
    this.logger.debug('calendar-events url', url, params.toString());
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

  getTimeBlockSummaryGoals():
    Observable<TimeBlockSummaryGoalListSm> {
    return this.httpClient
      .get(`${this.environment.khakiBff}/goals`)
      .pipe(
        tap(summaryData => this.logger.debug('Server response: summary goal', summaryData)),
        catchError(
          error => {
            this.logger.debug('Failed to get time block summary goal', error);
            return throwError('Failed to get time block summary goal');
          }
        ),
        map(timeBlockSummary => timeBlockSummary as TimeBlockSummaryGoalListSm)
      );

    }


}
