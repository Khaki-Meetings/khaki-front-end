import {Component, OnInit} from '@angular/core';
import {TimeBlockSummariesFacadeService} from '../../state/facades/time-block-summaries-facade.service';
import {ErrorSm} from '../../state/models/error-sm';
import {HistorianService, Logging} from '@natr/historian';
import {tap} from 'rxjs/operators';
import { TimeBlockSummaryAggSm } from '../../state/models/time-block-summary-agg-sm';
import { TimeBlockSummaryGoalsFacadeService } from '../../state/facades/time-block-summary-goals-facade.service';
import { TimeBlockSummaryGoalListSm } from '../../state/models/time-block-summary-goal-list-sm';
import { GoalMeasureEnum } from '../../services/models/goal-measure-enum';

interface GoalData {
  min: number;
  max: number;
  desc: string;
  met: boolean;
}

interface StatData {
  internal: number;
  external: number;
  total: number;
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

  percStaffTimeInMtgs: StatData;
  avgDailyMeetingTime: StatData;
  avgMeetingAttendees: StatData;

  avgMeetingLength: StatData;
  avgStaffTimePerMeeting: StatData;

  meetingLengthGoal: GoalData;
  attendeesPerMeetingGoal: GoalData;
  staffTimeInMeetingsGoal: GoalData;
  meetingPercentageThresholdGoal: GoalData;
  employeeMeetingsPerDayGoal: GoalData;
  averageStaffTimePerMeetingGoal: GoalData;
  employeeDailyMeetingTimeGoal: GoalData;

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
    var met: any;

    if (min != null && max != null) {
        met = (value >= min && value <= max) ? true : false;
    } else if (min != null) {
        met = (value >= min) ? true : false;
    } else if (max != null) {
        met = (value <= max) ? true : false;
    }

    return {
      min: min,
      max: max,
      desc: '',
      met: met
    }
   }

   private setupGoalEvalation() {
     if (this.timeBlockSummary != null && this.timeBlockSummaryGoal != null) {
       this.meetingLengthGoal = this.createGoal(
         this.timeBlockSummaryGoal?.goals?.find(x => x.measure == GoalMeasureEnum.AverageMeetingLength),
         this.timeBlockSummary.total?.meetingLengthSeconds /
           this.timeBlockSummary.total?.meetingCount);
       this.attendeesPerMeetingGoal = this.createGoal(
         this.timeBlockSummaryGoal?.goals?.find(x => x.measure == GoalMeasureEnum.AttendeesPerMeeting),
         this.timeBlockSummary.total?.totalMeetingAttendees / this.timeBlockSummary.total?.meetingCount
       );
       this.staffTimeInMeetingsGoal = this.createGoal(
         this.timeBlockSummaryGoal?.goals?.find(x => x.measure == GoalMeasureEnum.StaffTimeInMeetings),
         this.percStaffTimeInMtgs.total * 100
       );
       this.meetingPercentageThresholdGoal = this.createGoal(
         this.timeBlockSummaryGoal?.goals?.find(x => x.measure == GoalMeasureEnum.MeetingPercentageThreshold),
         this.timeBlockSummary.total?.numEmployeesOverTimeThreshold
       );

       this.employeeMeetingsPerDayGoal = this.createGoal(
         this.timeBlockSummaryGoal?.goals?.find(x => x.measure == GoalMeasureEnum.EmployeeMeetingsPerDay),
         this.timeBlockSummary?.total?.totalMeetingInternalAttendees
                   / this.timeBlockSummary?.total?.numWorkdays
                   / this.timeBlockSummary?.total?.numEmployees
       );
       this.averageStaffTimePerMeetingGoal = this.createGoal(
         this.timeBlockSummaryGoal?.goals?.find(x => x.measure == GoalMeasureEnum.AverageStaffTimePerMeeting),
         this.timeBlockSummary.total?.averageStaffSeconds
       );
       this.employeeDailyMeetingTimeGoal = this.createGoal(
         this.timeBlockSummaryGoal?.goals?.find(x => x.measure == GoalMeasureEnum.EmployeeDailyMeetingTime),
         this.avgDailyMeetingTime.total
       );
     }
   }

   private calculateStatData(): void {

     this.percStaffTimeInMtgs = {
       external: 0, internal: 0, total: 0
     }
     this.avgDailyMeetingTime = {
       external: 0, internal: 0, total: 0
     }

     if (this.timeBlockSummary?.total?.numWorkdays != null &&
       this.timeBlockSummary?.total?.numWorkdays != 0 &&
       this.timeBlockSummary?.total?.numEmployees != null &&
       this.timeBlockSummary?.total?.numEmployees != 0
     ) {
        var divisor = this.timeBlockSummary?.total?.numWorkdays * 8 *
          this.timeBlockSummary?.total?.numEmployees;

        this.percStaffTimeInMtgs = {
          external: this.timeBlockSummary?.external?.totalSeconds / 3600 / divisor,
          internal: this.timeBlockSummary?.internal?.totalSeconds / 3600 / divisor,
          total: this.timeBlockSummary?.total?.totalSeconds / 3600 / divisor
        }

        this.avgDailyMeetingTime = {
          external: this.timeBlockSummary?.external?.totalSeconds
            / this.timeBlockSummary?.total?.numEmployees
            / this.timeBlockSummary?.total?.numWorkdays,
          internal: this.timeBlockSummary?.internal?.totalSeconds
            / this.timeBlockSummary?.total?.numEmployees
            / this.timeBlockSummary?.total?.numWorkdays,
          total: this.timeBlockSummary?.total?.totalSeconds
            / this.timeBlockSummary?.total?.numEmployees
            / this.timeBlockSummary?.total?.numWorkdays
        }

     }

     this.avgMeetingLength = {
       external: 0, internal: 0, total: 0
     }

     this.avgMeetingLength.total =
        (this.timeBlockSummary?.internal?.averageMeetingLength)
          * (this.timeBlockSummary?.internal?.meetingCount / this.timeBlockSummary?.total?.meetingCount)
        +
        (this.timeBlockSummary?.external?.averageMeetingLength)
          * (this.timeBlockSummary?.external?.meetingCount / this.timeBlockSummary?.total?.meetingCount)

     this.avgStaffTimePerMeeting = {
       external: 0, internal: 0, total: 0
     }

     this.avgStaffTimePerMeeting.total =
        (this.timeBlockSummary?.internal?.averageStaffTimePerMeeting)
          * (this.timeBlockSummary?.internal?.meetingCount / this.timeBlockSummary?.total?.meetingCount)
        +
        (this.timeBlockSummary?.external?.averageStaffTimePerMeeting)
          * (this.timeBlockSummary?.external?.meetingCount / this.timeBlockSummary?.total?.meetingCount)

     this.avgMeetingAttendees = {
       external: 0, internal: 0, total: 0
     }

     if (this.timeBlockSummary?.internal?.meetingCount != 0) {
        this.avgMeetingAttendees.internal = this.timeBlockSummary?.internal?.totalMeetingAttendees / this.timeBlockSummary?.internal?.meetingCount
     }
     if (this.timeBlockSummary?.external?.meetingCount != 0) {
        this.avgMeetingAttendees.external = this.timeBlockSummary?.external?.totalMeetingAttendees / this.timeBlockSummary?.external?.meetingCount
     }

     if (this.timeBlockSummary?.total?.meetingCount != 0) {
       this.avgMeetingAttendees.total =
          (this.avgMeetingAttendees.internal)
            * (this.timeBlockSummary?.internal?.meetingCount / this.timeBlockSummary?.total?.meetingCount)
          +
          (this.avgMeetingAttendees.external)
            * (this.timeBlockSummary?.external?.meetingCount / this.timeBlockSummary?.total?.meetingCount)
     }

   }


  private timeBlockData(): void {
    this.sinceTimeBlockSummariesFacade.timeBlockSummary()
      .pipe(tap(data => this.logger.debug('timeBlockSummary data', data)))
      .subscribe(
        timeBlockSummary => {
          this.timeBlockSummary = timeBlockSummary;
          this.calculateStatData();
          this.setupGoalEvalation();
        });
    this.timeBlockSummaryGoalsFacadeService.timeBlockGoalSummary()
      .pipe(tap(data => this.logger.debug('timeBlockSummaryGoal data', data)))
      .subscribe(
        timeBlockSummaryGoal => {
          this.timeBlockSummaryGoal = timeBlockSummaryGoal;
          this.setupGoalEvalation();
          console.log('data from state', timeBlockSummaryGoal); // was natr-historian  this.logger.debug
        }
      );
  }

}
