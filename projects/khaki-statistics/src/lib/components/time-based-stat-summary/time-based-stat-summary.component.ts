import {Component, OnInit} from '@angular/core';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {TimeBlockSummariesFacadeService} from '../../state/facades/time-block-summaries-facade.service';
import {TimeBlockSummarySm} from '../../state/models/time-block-summary-sm';
import {ErrorSm} from '../../state/models/errorSm';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Component({
  selector: 'lib-time-based-stat-summary',
  templateUrl: './time-based-stat-summary.component.html',
  styleUrls: ['./time-based-stat-summary.component.scss']
})
export class TimeBasedStatSummaryComponent implements OnInit {
  logger: HistorianService;

  faCaretDrop = faCaretDown;

  timeBlockSummary: TimeBlockSummarySm;
  error: ErrorSm;

  constructor(private sinceTimeBlockSummariesFacade: TimeBlockSummariesFacadeService) {
  }

  ngOnInit(): void {
    this.sinceTimeBlockSummariesFacade.timeBlockSummary().subscribe(
      timeBlockSummary => {
        this.logger.debug(timeBlockSummary);
        this.timeBlockSummary = timeBlockSummary;
      }
    );
    // this.sinceTimeBlockSummariesFacade.timeBlockSummaryErrors().subscribe(error => this.error = error);
    //
    this.sinceTimeBlockSummariesFacade.requestTimeBlockSummary();
  }

}
