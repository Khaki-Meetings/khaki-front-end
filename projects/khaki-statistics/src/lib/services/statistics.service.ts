import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TimeBlockSummarySm} from '../state/models/time-block-summary-sm';
import {HttpClient} from '@angular/common/http';
import {TimeBlockSummaryResponseDto} from './models/time-block-summary-response-dto';
import {map} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {OrganizersStatisticsSm} from '../state/models/organizers-statistics-sm';
import {createSchema, morphism, StrictSchema} from 'morphism';
import {OrganizersStatisticsDto} from './models/organizers-statistics-dto';
import {DepartmentStatisticsSm} from '../state/models/department-statistics-sm';
import {DepartmentStatisticsResponseDto} from './models/department-statistics-response-dto';
import {TrailingStatisticsResponseDto} from './models/trailing-statistics-response-dto';
import {TrailingStatisticsSm} from '../state/models/trailing-statistics-sm';

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

  getOrganizersStatistics(): Observable<OrganizersStatisticsSm> {
    return this.httpClient
      .get('/assets/organizersTableData.json')
      .pipe(
        map(
          (data: OrganizersStatisticsDto) => morphism(this.organizersStatisticsSchema, data)
        ),
      );
  }

  getTrailingStatistics(): Observable<TrailingStatisticsSm> {
    return this.httpClient
      .get('/assets/twelveMonthTrailingData.json')
      .pipe(
        map(
          (data: TrailingStatisticsResponseDto) => data as TrailingStatisticsSm
        ),
      );
  }


  getDepartmentStatistics(): Observable<DepartmentStatisticsSm[]> {
    return this.httpClient
      .get('/assets/perDepartmentData.json')
      .pipe(
        map(
          (data: DepartmentStatisticsResponseDto[]) => data as DepartmentStatisticsSm[]
        ),
      );
  }

  getTimeBlockSummary(): Observable<TimeBlockSummarySm> {
    return this.httpClient
      .get('/assets/timeBlockSummaryData.json')
      .pipe(
        map(
          (timeBlockSummary: TimeBlockSummaryResponseDto) => timeBlockSummary as TimeBlockSummarySm
        )
      );
  }

}
