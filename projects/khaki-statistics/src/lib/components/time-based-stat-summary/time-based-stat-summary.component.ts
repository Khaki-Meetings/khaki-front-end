import {Component, OnInit} from '@angular/core';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {SinceTimeBlockSummariesFacadeService} from '../../state/facades/since-time-block-summaries-facade.service';
import {TimeBlockSummarySm} from '../../state/models/time-block-summary-sm';

@Component({
  selector: 'lib-time-based-stat-summary',
  templateUrl: './time-based-stat-summary.component.html',
  styleUrls: ['./time-based-stat-summary.component.scss']
})
export class TimeBasedStatSummaryComponent implements OnInit {

  faCaretDrop = faCaretDown;

  timeBlockSummary: TimeBlockSummarySm;

  constructor(private sinceTimeBlockSummariesFacade: SinceTimeBlockSummariesFacadeService) {
  }

  ngOnInit(): void {
  }

}
