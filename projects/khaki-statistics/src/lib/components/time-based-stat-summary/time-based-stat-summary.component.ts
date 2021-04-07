import {Component, OnInit} from '@angular/core';
import {TimeBlockSummariesFacadeService} from '../../state/facades/time-block-summaries-facade.service';
import {TimeBlockSummarySm} from '../../state/models/time-block-summary-sm';
import {ErrorSm} from '../../state/models/error-sm';
import {HistorianService, Logging} from '@natr/historian';
import {tap} from 'rxjs/operators';
import { TimeBlockSummaryAggSm } from '../../state/models/time-block-summary-agg-sm';
import { TimeBlockSummaryGoalsFacadeService } from '../../state/facades/time-block-summary-goals-facade.service';
import { TimeBlockSummaryGoalListSm } from '../../state/models/time-block-summary-goal-list-sm';
import { TimeBlockSummaryGoalSm } from '../../state/models/time-block-summary-goal-sm';
import { GoalMeasureEnum } from '../../services/models/goal-measure-enum';
import { GoalDisplayPipe } from '../../pipes/goal-display.pipe';
import { GoalDisplayHoursMinutesPipe } from '../../pipes/goal-display-hours-minutes.pipe';
import { TimeBasedStatComponent } from '../time-based-stat/time-based-stat.component';

interface GoalData {
  min: number;
  max: number;
  desc: string;
  met: boolean;
}

@Logging
@Component({
  selector: 'lib-time-based-stat-summary',
  templateUrl: './time-based-stat-summary.component.html',
  styleUrls: ['./time-based-stat-summary.component.scss']
})


export class TimeBasedStatSummaryComponent implements OnInit {
  logger: HistorianService;
  timeBlockSummary: TimeBlockSummaryAggSm;
  timeBlockSummaryGoal: TimeBlockSummaryGoalListSm;
  error: ErrorSm;
  loading = false;

  meetingLengthGoal: GoalData;
  attendeesPerMeetingGoal: GoalData;

  constructor(private sinceTimeBlockSummariesFacade: TimeBlockSummariesFacadeService,
    private timeBlockSummaryGoalsFacadeService: TimeBlockSummaryGoalsFacadeService) {
  }

  ngOnInit(): void {
    this.timeBlockData();
    this.sinceTimeBlockSummariesFacade.timeBlockSummaryLoading().subscribe(loading => this.loading = loading);
    this.timeBlockSummaryGoalsFacadeService.timeBlockSummaryGoalLoading().subscribe(loading => this.loading = loading);
  }

  private createGoal(goal : any, value: any): GoalData {
    var min = goal?.greaterThanOrEqualTo;
    var max = goal?.lessThanOrEqualTo;

    console.log("Goal evaluation: " + min + " " + value + " " + max + " "
      + (value >= min && value <= max ? true : false));

    return {
      min: min,
      max: max,
      desc: '',
      met: value >= min && value <= max ? true : false
    }
   }

  private timeBlockData(): void {
    this.sinceTimeBlockSummariesFacade.timeBlockSummary()
      .pipe(tap(data => this.logger.debug('timeBlockSummary data', data)))
      .subscribe(timeBlockSummary => this.timeBlockSummary = timeBlockSummary);
    this.timeBlockSummaryGoalsFacadeService.timeBlockGoalSummary()
      .pipe(tap(data => this.logger.debug('timeBlockSummaryGoal data', data)))
      .subscribe(
          (data) => {
            this.timeBlockSummaryGoal = data;
            console.log('data from state', data); // was natr-historian  this.logger.debug
            this.meetingLengthGoal = this.createGoal(
              data?.goals?.find(x => x.measure == GoalMeasureEnum.AverageMeetingLength),
              this.timeBlockSummary.total?.meetingLengthSeconds /
                this.timeBlockSummary.total?.meetingCount);
            this.attendeesPerMeetingGoal = this.createGoal(
              data?.goals?.find(x => x.measure == GoalMeasureEnum.AttendeesPerMeeting),
              this.timeBlockSummary.total?.totalMeetingAttendees / this.timeBlockSummary.total?.meetingCount
            );
          }
        );
  }

}
