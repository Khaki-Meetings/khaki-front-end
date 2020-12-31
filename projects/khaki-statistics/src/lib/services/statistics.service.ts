import {Inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {TimeBlockSummarySm} from '../state/models/time-block-summary-sm';
import {HttpClient} from '@angular/common/http';
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
    this.logger.debug('startEnd is', startEnd);
    const formattedStart = startEnd.start.utc().format();
    const formattedEnd = startEnd.end.utc().format();
    const url = `${this.environment.khakiBff}/statistics/${statName}/${formattedStart}/${formattedEnd}`;

    this.logger.debug('url is', url);

    return url;
  }

  getOrganizersStatistics(interval: IntervalEnum, count: number = 5, page: number = 0): Observable<OrganizersStatisticsSm> {
    return this.httpClient
      .get(this.getStartEndUrl(interval, 'organizers') + `?count=${count}&page=${page}`)
      .pipe(
        tap(data => this.logger.debug('organizers statistics response', data)),
        catchError(
          error => {
            this.logger.error('Failed to get organizers statistics', error);
            return throwError('Failed to get organizers statistics');
          }
        ),
        map(data => data as OrganizersStatisticsSm)
      );
  }

  getTrailingStatistics(interval: IntervalEnum): Observable<TrailingStatisticsSm> {
    const count = 12;
    const startEnd = this.getStartEnd(interval);
    const formattedStart = startEnd.start.utc().format();
    const url = `${this.environment.khakiBff}/statistics/trailing/${formattedStart}/${interval}/${count}`;
    this.logger.debug('trailing url', url);

    return this.httpClient
      .get(url)
      .pipe(
        tap(data => this.logger.debug('trailing data', data)),
        catchError(
          error => {
            this.logger.error('Failed to get trailing statistics', error);
            return throwError('Failed to get trailing statistics');
          }
        ),
        map(
          (data: TrailingStatisticsResponseDto) => data as TrailingStatisticsSm
        ),
      );
  }

  getDepartmentStatistics(interval: IntervalEnum): Observable<DepartmentsStatisticsSm> {
    return this.httpClient
      .get(this.getStartEndUrl(interval, 'department'))
      .pipe(
        tap(data => this.logger.debug('raw department data from server', data)),
        catchError(
          error => {
            this.logger.error('Failed to get department statistics', error);
            return throwError('Failed to get department statistics');
          }
        ),
        map((data: DepartmentsStatisticsResponseDto) => data as DepartmentsStatisticsSm),
      );
  }

  getTimeBlockSummary(interval: IntervalEnum): Observable<TimeBlockSummarySm> {
    return this.httpClient
      .get(this.getStartEndUrl(interval, 'summary'))
      .pipe(
        tap(ret => this.logger.debug('timeBlockSummary data', ret)),
        catchError(
          error => {
            this.logger.error('Failed to get time block summary', error);
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
