import {Inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {TimeBlockSummarySm} from '../state/models/time-block-summary-sm';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TimeBlockSummaryResponseDto} from './models/time-block-summary-response-dto';
import {catchError, map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {OrganizersStatisticsSm} from '../state/models/organizers-statistics-sm';
import {TrailingStatisticsResponseDto} from './models/trailing-statistics-response-dto';
import {TrailingStatisticsSm} from '../state/models/trailing-statistics-sm';
import * as momentJs from 'moment';
import {DepartmentsStatisticsResponseDto} from './models/departments-statistics-response-dto';
import {DepartmentsStatisticsSm} from '../state/models/departments-statistics-sm';
import {StatisticsQueryParameters} from './models/statistics-query-parameters';
import {IntervalSe} from '../state/statistics-filters/interval-se.enum';
import Moment = momentJs.Moment;

interface TimeBlockRange {
  start: Moment;
  end: Moment;
}

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

    this.logger.debug('here 1');
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
    params = params.set('page', page);
    params = params.set('count', count);
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

  getTrailingStatistics(
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

  getDepartmentStatistics(
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

  getTimeBlockSummary(start: Moment, end: Moment, statisticsQueryParams: StatisticsQueryParameters): Observable<TimeBlockSummarySm> {
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
}
