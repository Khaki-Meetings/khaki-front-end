import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TimeBlockSummarySm} from '../state/models/time-block-summary-sm';
import {HttpClient} from '@angular/common/http';
import {TimeBlockSummaryResponseDto} from './models/time-block-summary-response-dto';
import {map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {OrganizersStatisticsSm} from '../state/models/organizers-statistics-sm';
import {createSchema, morphism, StrictSchema} from 'morphism';
import {OrganizersStatisticsDto} from './models/organizers-statistics-dto';
import {DepartmentStatisticsSm} from '../state/models/department-statistics-sm';
import {DepartmentStatisticsResponseDto} from './models/department-statistics-response-dto';
import {TrailingStatisticsResponseDto} from './models/trailing-statistics-response-dto';
import {TrailingStatisticsSm} from '../state/models/trailing-statistics-sm';
import {IntervalEnum} from './models/interval.enum';

@Logging
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  logger: HistorianService;
  private readonly organizersStatisticsSchema: StrictSchema<OrganizersStatisticsSm, OrganizersStatisticsDto>;

  constructor(private httpClient: HttpClient) {
    this.organizersStatisticsSchema = createSchema<OrganizersStatisticsSm, OrganizersStatisticsDto>(
      {
        organizersStatistics: 'organizersStatistics',
        page: 'page'
      }
    );
  }

  getOrganizersStatistics(interval: IntervalEnum): Observable<OrganizersStatisticsSm> {
    const url = `/assets/organizersTable${interval}Data.json`;
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (data: OrganizersStatisticsDto) => morphism(this.organizersStatisticsSchema, data)
        ),
      );
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
