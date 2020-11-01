import {Component, OnInit} from '@angular/core';
import {SinceTimeBlockSummariesSm} from '../../state/models/since-time-block-summaries-sm';
import {faCaretDown, faCoffee} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-time-based-stat-summary',
  templateUrl: './time-based-stat-summary.component.html',
  styleUrls: ['./time-based-stat-summary.component.scss']
})
export class TimeBasedStatSummaryComponent implements OnInit {

  faCoffee = faCoffee;
  faCaretDrop = faCaretDown;


  sinceTimeBlockSummaries: SinceTimeBlockSummariesSm;

  constructor() {
  }

  ngOnInit(): void {
  }

}
