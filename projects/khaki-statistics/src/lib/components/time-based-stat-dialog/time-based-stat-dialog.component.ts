import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoogleAnalyticsService } from '../../google-analytics.service';

export interface DialogData {
  goal: any;
  title: any;
  goalValue: any;
  goalTimeHoursValue: number;
  goalTimeMinutesValue: number;
  displayTimeInput: boolean;
  displayNumberInput: boolean;
  label: any;
  helpContent: any;
}

@Component({
  selector: 'lib-time-based-stat-dialog',
  templateUrl: './time-based-stat-dialog.component.html',
  styleUrls: ['./time-based-stat-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimeBasedStatDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TimeBasedStatDialogComponent>,
    public googleAnalyticsService: GoogleAnalyticsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {

    this.dialogRef.afterClosed().subscribe(result => {
      this.googleAnalyticsService.eventEmitter("save_stats_popup",
        "engagement", "save_stats_popup_action", "save_stats_popup",
      result.goal);
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
