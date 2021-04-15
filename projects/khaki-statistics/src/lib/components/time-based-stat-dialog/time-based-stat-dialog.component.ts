import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  styleUrls: ['./time-based-stat-dialog.component.scss']
})
export class TimeBasedStatDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TimeBasedStatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
