import {Inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {TimeBlockSummarySm} from '../state/models/time-block-summary-sm';
import {HttpClient} from '@angular/common/http';
import {TimeBlockSummaryResponseDto} from './models/time-block-summary-response-dto';
import {catchError, map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {OrganizersStatisticsSm} from '../state/models/organizers-statistics-sm';
import {createSchema, morphism, StrictSchema} from 'morphism';
import {OrganizersStatisticsDto} from './models/organizers-statistics-dto';
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

  private getStartEndUrl(interval: IntervalEnum, statName: string): string {
    let url = `/assets/${statName}${interval}Data.json`;
    if (this.environment.khakiBff) {
      const startEnd = this.getStartEnd(interval);
      this.logger.debug('startEnd is', startEnd);
      const formattedStart = startEnd.start.utc().format();
      const formattedEnd = startEnd.end.utc().format();
      url = `${this.environment.khakiBff}/statistics/${statName}/${formattedStart}/${formattedEnd}`;
    }

    this.logger.debug('url is', url);

    return url;
  }

  getOrganizersStatistics(interval: IntervalEnum): Observable<OrganizersStatisticsSm> {
    return this.httpClient
      .get(this.getStartEndUrl(interval, 'organizers'))
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

  getTrailingStatistics(interval: IntervalEnum): Observable<TrailingStatisticsSm> {
    let url = '/assets/twelveMonthTrailingData.json';

    if (this.environment.khakiBff) {
      const count = 12;
      const startEnd = this.getStartEnd(interval);
      this.logger.debug('start is', startEnd.start);
      const formattedStart = startEnd.start.utc().format();
      url = `${this.environment.khakiBff}/statistics/trailing/${formattedStart}/${interval}/${count}`;
    }

    return this.httpClient
      .get(url)
      .pipe(
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
        map((data: DepartmentsStatisticsResponseDto) => data as DepartmentsStatisticsSm),
      );
  }

  getTimeBlockSummary(interval: IntervalEnum): Observable<TimeBlockSummarySm> {
    return this.httpClient
      .get(this.getStartEndUrl(interval, 'summary'))
      .pipe(
        tap(ret => this.logger.debug('timeBlockSummary data', ret)),
        map(
          (timeBlockSummary: TimeBlockSummaryResponseDto) => {
            this.logger.debug('GETTING TIME BLOCK INFO');
            timeBlockSummary.averageManHours = 0;
            if (timeBlockSummary.totalHours != 0 && timeBlockSummary.meetingCount !== 0) {
              timeBlockSummary.averageManHours = timeBlockSummary.totalHours / timeBlockSummary.meetingCount;
            }
//            console.log("TOTAL HOURS:" + timeBlockSummary.totalHours.toString());
//            this.logger.debug(timeBlockSummary.meetingCount.toString());
//            this.logger.debug(timeBlockSummary.averageManHours.toString());
            this.logger.debug(timeBlockSummary);
            return timeBlockSummary;
          }
        )
      );
  }
}
