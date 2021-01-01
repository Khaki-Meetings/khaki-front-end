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
import {IntervalEnum} from './models/interval.enum';
import * as momentJs from 'moment';
import {DepartmentsStatisticsResponseDto} from './models/departments-statistics-response-dto';
import {DepartmentsStatisticsSm} from '../state/models/departments-statistics-sm';
import StartOf = momentJs.unitOfTime.StartOf;
import Moment = momentJs.Moment;
import {StatisticsQueryParameters} from './models/statistics-query-parameters';

const moment = momentJs;

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

  // noinspection JSMethodCanBeStatic
  private getStartEnd(interval: IntervalEnum): TimeBlockRange {
    const now = moment();
    let timeBlock: StartOf;
    switch (interval) {
      case IntervalEnum.Day:
        timeBlock = 'day';
        break;
      case IntervalEnum.Week:
        timeBlock = 'week';
        break;
      case IntervalEnum.Month:
        timeBlock = 'month';
        break;
      case IntervalEnum.Year:
        timeBlock = 'year';
        break;
    }

    return {
      start: now.clone().utc().startOf(timeBlock),
      end: now.clone().utc().endOf(timeBlock)
    };
  }

  private getStartEndUrl(interval: IntervalEnum, statName: string): string {
    const startEnd = this.getStartEnd(interval);
    console.log('startEnd is', startEnd);
    const formattedStart = startEnd.start.utc().format();
    const formattedEnd = startEnd.end.utc().format();
    const url = `${this.environment.khakiBff}/statistics/${statName}/${formattedStart}/${formattedEnd}`;

    console.log('url is', url);

    return url;
  }

  getOrganizersStatistics(interval: IntervalEnum, statisticsQueryParams: StatisticsQueryParameters): Observable<OrganizersStatisticsSm> {
    const params = new HttpParams();
    params.set('page', statisticsQueryParams.page.toString());
    params.set('count', statisticsQueryParams.count.toString());
    params.set('filter', statisticsQueryParams.filter.toString());
    return this.httpClient
      .get(this.getStartEndUrl(interval, 'organizers'), {params})
      .pipe(
        tap(organizersData => console.log('Server response organizers', organizersData)),
        catchError(
          error => {
            console.log('Failed to get organizers statistics', error);
            return throwError('Failed to get organizers statistics');
          }
        ),
        map(organizersStatisticsData => organizersStatisticsData as OrganizersStatisticsSm)
      );
  }

  getTrailingStatistics(interval: IntervalEnum, statisticsQueryParams: StatisticsQueryParameters): Observable<TrailingStatisticsSm> {
    const params = new HttpParams();
    params.set('filter', statisticsQueryParams.filter.toString());
    const intervalCount = 12;
    const startEnd = this.getStartEnd(interval);
    const formattedStart = startEnd.start.utc().format();
    const url = `${this.environment.khakiBff}/statistics/trailing/${formattedStart}/${interval}/${intervalCount}`;
    console.log('trailing url', url);

    return this.httpClient
      .get(url, {params})
      .pipe(
        tap(trailingData => console.log('Server response: trailing', trailingData)),
        catchError(
          error => {
            console.log('Server response: trailing', error);
            return throwError('Failed to get trailing statistics');
          }
        ),
        map(
          (trailingStatisticsResponseDto: TrailingStatisticsResponseDto) => trailingStatisticsResponseDto as TrailingStatisticsSm
        ),
      );
  }

  getDepartmentStatistics(interval: IntervalEnum, statisticsQueryParams: StatisticsQueryParameters): Observable<DepartmentsStatisticsSm> {
    const params = new HttpParams();
    params.set('filter', statisticsQueryParams.filter.toString());
    return this.httpClient
      .get(this.getStartEndUrl(interval, 'department'), {params})
      .pipe(
        tap(departmentData => console.log('Server response: department', departmentData)),
        catchError(
          error => {
            console.log('Failed to get department statistics', error);
            return throwError('Failed to get department statistics');
          }
        ),
        map((departmentsStatistics: DepartmentsStatisticsResponseDto) => departmentsStatistics as DepartmentsStatisticsSm),
      );
  }

  getTimeBlockSummary(interval: IntervalEnum, statisticsQueryParams: StatisticsQueryParameters): Observable<TimeBlockSummarySm> {
    const params = new HttpParams();
    params.set('filter', statisticsQueryParams.filter.toString());
    return this.httpClient
      .get(this.getStartEndUrl(interval, 'summary'), {params})
      .pipe(
        tap(summaryData => console.log('Server response: summary', summaryData)),
        catchError(
          error => {
            console.log('Failed to get time block summary', error);
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
