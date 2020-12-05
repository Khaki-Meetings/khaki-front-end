import {Inject, Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {TimeBlockSummarySm} from '../state/models/time-block-summary-sm';
import {HttpClient} from '@angular/common/http';
import {TimeBlockSummaryResponseDto} from './models/time-block-summary-response-dto';
import {catchError, map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {OrganizersStatisticsSm} from '../state/models/organizers-statistics-sm';
import {createSchema, morphism, StrictSchema} from 'morphism';
import {OrganizersStatisticsDto} from './models/organizers-statistics-dto';
import {DepartmentStatisticsSm} from '../state/models/department-statistics-sm';
import {DepartmentStatisticsResponseDto} from './models/department-statistics-response-dto';
import {TrailingStatisticsResponseDto} from './models/trailing-statistics-response-dto';
import {TrailingStatisticsSm} from '../state/models/trailing-statistics-sm';
import {IntervalEnum} from './models/interval.enum';
import * as momentJs from 'moment';
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
  private readonly organizersStatisticsSchema: StrictSchema<OrganizersStatisticsSm, OrganizersStatisticsDto>;

  constructor(private httpClient: HttpClient, @Inject('environment') private environment) {
    this.organizersStatisticsSchema = createSchema<OrganizersStatisticsSm, OrganizersStatisticsDto>(
      {
        organizersStatistics: 'organizersStatistics',
        page: 'page'
      }
    );
  }

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

    this.logger.debug('now is', now);
    this.logger.debug('interval is', interval);

    return {
      start: now.clone().utc().startOf(timeBlock),
      end: now.clone().utc().endOf(timeBlock)
    };
  }

  getOrganizersStatistics(interval: IntervalEnum): Observable<OrganizersStatisticsSm> {
    let url = `/assets/organizersTable${interval}Data.json`;
    this.logger.debug('environment is', this.environment);

    if (!this.environment.uiOnly) {
      const startEnd = this.getStartEnd(interval);
      this.logger.debug('startEnd is', startEnd);
      const formattedStart = startEnd.start.utc().format();
      const formattedEnd = startEnd.end.utc().format();
      url = `${this.environment.khakiBff}/statistics/organizers/${formattedStart}/${formattedEnd}`;
    }

    this.logger.debug('url is', url);
    return this.httpClient
      .get(url)
      .pipe(
        catchError(
          error => {
            this.logger.error('Failed to get organizers statistics', error);
            return throwError('Failed to get organizers statistics');
          }
        ),
        map(
          (data: OrganizersStatisticsDto) => morphism(this.organizersStatisticsSchema, data)
        )
      )
      ;
  }

  getTrailingStatistics(): Observable<TrailingStatisticsSm> {
    const url = '/assets/twelveMonthTrailingData.json';
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (data: TrailingStatisticsResponseDto) => data as TrailingStatisticsSm
        ),
      );
  }


  getDepartmentStatistics(interval: IntervalEnum): Observable<DepartmentStatisticsSm[]> {
    const url = `/assets/perDepartment${interval}Data.json`;
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (data: DepartmentStatisticsResponseDto[]) => data as DepartmentStatisticsSm[]
        ),
      );
  }

  getTimeBlockSummary(interval: IntervalEnum): Observable<TimeBlockSummarySm> {
    const url = `/assets/timeBlockSummary${interval}Data.json`;
    this.logger.debug('url', url);
    return this.httpClient
      .get(url)
      .pipe(
        tap(ret => this.logger.debug('timeBlockSummary data', ret)),
        map(
          (timeBlockSummary: TimeBlockSummaryResponseDto) => timeBlockSummary as TimeBlockSummarySm
        )
      );
  }
}
