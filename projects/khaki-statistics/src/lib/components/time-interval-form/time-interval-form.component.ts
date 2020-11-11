import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IntervalEnum} from '../../services/models/interval.enum';
import {HistorianService, Logging} from '@natr/historian';
import {CurrentTimeIntervalFacadeService} from '../../state/facades/current-time-interval-facade.service';

@Logging
@Component({
  selector: 'lib-time-interval-form',
  templateUrl: './time-interval-form.component.html',
  styleUrls: ['./time-interval-form.component.scss']
})
export class TimeIntervalFormComponent implements OnInit {
  logger: HistorianService;
  timeIntervals = [
    IntervalEnum.Week,
    IntervalEnum.Month
  ];

  form: FormGroup;
  timeIntervalControl: FormControl;

  private defaultTimeInterval = IntervalEnum.Week;

  constructor(private currentTimeIntervalFacade: CurrentTimeIntervalFacadeService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.currentTimeIntervalFacade.setCurrentTimeInterval(this.defaultTimeInterval);
  }

  private buildForm(): void {
    this.timeIntervalControl = new FormControl();
    this.form = new FormGroup({
      timeInterval: this.timeIntervalControl
    });

    this.timeIntervalControl.setValue(this.defaultTimeInterval);

    this.timeIntervalControl.valueChanges.subscribe(newValue => this.currentTimeIntervalFacade.setCurrentTimeInterval(newValue));
  }
}
