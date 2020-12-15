import {Component, OnInit} from '@angular/core';
import {TimeBlockSummariesFacadeService} from '../../state/facades/time-block-summaries-facade.service';
import {TimeBlockSummarySm} from '../../state/models/time-block-summary-sm';
import {ErrorSm} from '../../state/models/errorSm';
import {HistorianService, Logging} from '@natr/historian';
import {tap} from 'rxjs/operators';

@Logging
@Component({
  selector: 'lib-time-based-stat-summary',
  templateUrl: './time-based-stat-summary.component.html',
  styleUrls: ['./time-based-stat-summary.component.scss']
})
export class TimeBasedStatSummaryComponent implements OnInit {
  logger: HistorianService;
  timeBlockSummary: TimeBlockSummarySm;
  error: ErrorSm;

  constructor(private sinceTimeBlockSummariesFacade: TimeBlockSummariesFacadeService) {
  }

  ngOnInit(): void {
    this.timeBlockData();
  }

  private timeBlockData(): void {
    this.sinceTimeBlockSummariesFacade.timeBlockSummary()
      .pipe(tap(data => this.logger.debug('data', data)))
      .subscribe(timeBlockSummary => this.timeBlockSummary = this.formatData(timeBlockSummary));
  }

  private formatData(timeBlockSummary: TimeBlockSummarySm): TimeBlockSummarySm {
    var timeBlockSummarySm: TimeBlockSummarySm = {
      timeBlock: timeBlockSummary.timeBlock,
      totalSeconds: timeBlockSummary.totalSeconds,
      totalCost: timeBlockSummary.totalCost,
      averageCost: timeBlockSummary.averageCost,
      meetingCount: timeBlockSummary.meetingCount,
      error: timeBlockSummary.error,
      averageStaffSeconds: timeBlockSummary.averageStaffSeconds,
      formattedTotalSeconds: Math.trunc(timeBlockSummary.totalSeconds / 60 / 60) + ' hrs, '
        + Math.trunc(timeBlockSummary.totalSeconds / 60 % 60) + ' min',
      formattedAverageStaffSeconds: Math.trunc(timeBlockSummary.averageStaffSeconds / 60 / 60) + ' hrs, '
        + Math.trunc(timeBlockSummary.averageStaffSeconds / 60 % 60) + ' min',
    };
    return timeBlockSummarySm;
  }
}
