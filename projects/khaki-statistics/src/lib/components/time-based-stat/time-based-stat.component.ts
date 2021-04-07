import { Component, Input, OnInit } from '@angular/core';
import { TimeBlockSummariesFacadeService } from '../../state/facades/time-block-summaries-facade.service';
import { TimeBlockSummaryGoalsFacadeService } from '../../state/facades/time-block-summary-goals-facade.service';

@Component({
  selector: 'lib-time-based-stat',
  templateUrl: './time-based-stat.component.html',
  styleUrls: ['./time-based-stat.component.scss']
})
export class TimeBasedStatComponent implements OnInit {

  @Input() label: any;
  @Input() helpId: any;
  @Input() helpContent: any;
  @Input() totalValue: any;
  @Input() internalValue: any;
  @Input() externalValue: any;
  @Input() goalMet: any;
  @Input() goalText: any;

  loading = false;

  constructor(private sinceTimeBlockSummariesFacade: TimeBlockSummariesFacadeService,
    private timeBlockSummaryGoalsFacadeService: TimeBlockSummaryGoalsFacadeService) {
  }

  ngOnInit(): void {
    this.sinceTimeBlockSummariesFacade.timeBlockSummaryLoading().subscribe(loading => this.loading = loading);
    this.timeBlockSummaryGoalsFacadeService.timeBlockSummaryGoalLoading().subscribe(loading => this.loading = loading);
  }

}
