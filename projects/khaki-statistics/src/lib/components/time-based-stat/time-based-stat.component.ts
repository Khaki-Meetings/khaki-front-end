import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimeBlockSummariesFacadeService } from '../../state/facades/time-block-summaries-facade.service';
import { TimeBlockSummaryGoalsFacadeService } from '../../state/facades/time-block-summary-goals-facade.service';
import { TimeBasedStatDialogComponent } from '../time-based-stat-dialog/time-based-stat-dialog.component';

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
  @Input() goal: any;
  @Input() goalMet: any;
  @Input() goalText: any;
  @Input() measureText: any;

  loading = false;

  constructor(private sinceTimeBlockSummariesFacade: TimeBlockSummariesFacadeService,
    private timeBlockSummaryGoalsFacadeService: TimeBlockSummaryGoalsFacadeService,
    public dialog: MatDialog,
    private httpClient: HttpClient,
    @Inject('environment') private environment) {
  }

  ngOnInit(): void {
    this.sinceTimeBlockSummariesFacade.timeBlockSummaryLoading().subscribe(loading => this.loading = loading);
    this.timeBlockSummaryGoalsFacadeService.timeBlockSummaryGoalLoading().subscribe(loading => this.loading = loading);
  }

  displayStatisticPopup(): void {

    var displayTimeInput = true;
    var displayNumberInput = false;
    var label = "";

    if (this.goal == "AttendeesPerMeeting"
      || this.goal == "StaffTimeInMeetings"
      || this.goal == "MeetingPercentageThreshold"
      || this.goal == "EmployeeMeetingsPerDay") {
      displayNumberInput = true;
      displayTimeInput = false;
    }

    if (this.goal == "TotalStaffTimeInMeetings"
      || this.goal == "TotalNumberOfMeetings") {
      displayNumberInput = false;
      displayTimeInput = false;
    }

    if (this.goal == "AttendeesPerMeeting") {
      label = "attendees"
    }
    if (this.goal == "StaffTimeInMeetings") {
      label = "%"
    }

    const dialogRef = this.dialog.open(TimeBasedStatDialogComponent, {
      data: {
        title: this.label,
        goal: this.goal,
        displayTimeInput: displayTimeInput,
        displayNumberInput: displayNumberInput,
        label: label,
        helpContent: this.helpContent
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      var lteGoalValue = result.goalValue;
      var gteGoalValue = null;

      if (result.goalTimeHoursValue || result.goalTimeMinutesValue) {

        if (!result.goalTimeHoursValue) {
          result.goalTimeHoursValue = 0;
        }

        if (!result.goalTimeMinutesValue) {
          result.goalTimeMinutesValue = 0;
        }

        lteGoalValue = (((result.goalTimeHoursValue - 0) * 60)
          + (result.goalTimeMinutesValue - 0)) * 60;
      }

      if (this.goal == "MeetingPercentageThreshold") {
        gteGoalValue = result.goalValue;
        lteGoalValue = null;
      }

      const url = `${this.environment.khakiBff}/goals`;
      console.log('URL' + url);

      this.httpClient.post(url, {
          measure: this.goal,
          greaterThanOrEqualTo: gteGoalValue,
          lessThanOrEqualTo: lteGoalValue,
          departmentName: null
      }).subscribe(data => {
        console.log("Goal update response: " + data);
        this.sinceTimeBlockSummariesFacade.requestTimeBlockSummary();
        this.timeBlockSummaryGoalsFacadeService.requestTimeBlockSummaryGoal();
      });

    });
  }
}
