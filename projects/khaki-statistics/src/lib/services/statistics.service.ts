import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NotImplementedException} from '../exceptions/not-implemented-exception';
import {OrganizersStatisticsDto} from './models/organizers-statistics-dto';
import {TimeBlockSummarySm} from '../state/models/time-block-summary-sm';
import {HttpClient} from '@angular/common/http';
import {TimeBlockSummaryResponseDto} from './models/time-block-summary-response-dto';
import {map, tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  logger: HistorianService;

  constructor(private httpClient: HttpClient) {
  }

  getOrganizersStatistics(): Observable<OrganizersStatisticsDto> {
    throw new NotImplementedException();
  }

  getTimeBlockSummary(): Observable<TimeBlockSummarySm> {
    return this.httpClient
      .get('/assets/timeBlockSummaryData.json')
      .pipe(
        // tap(data => this.logger.debug('data from server', data)),
        map(
          (timeBlockSummary: TimeBlockSummaryResponseDto) => ({
            totalMeetings: timeBlockSummary.totalMeetings,
            totalCost: timeBlockSummary.totalCost,
            totalTime: timeBlockSummary.totalTime,
            averageCost: timeBlockSummary.averageCost
          } as TimeBlockSummarySm)
        )
      );
  }

}
