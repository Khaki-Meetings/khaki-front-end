import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IntervalEnum} from '../../services/models/interval.enum';
import {HistorianService, Logging} from '@natr/historian';
import {CurrentTimeIntervalFacadeService} from '../../state/facades/current-time-interval-facade.service';
import {IntervalSe} from '../../state/models/interval-se';
import {BaseIntervalComponent} from '../base-interval.component';
import * as momentJs from 'moment';
import {Moment} from 'moment';
import StartOf = moment.unitOfTime.StartOf;

@Logging
@Component({
  selector: 'lib-time-interval-form',
  templateUrl: './time-interval-form.component.html',
  styleUrls: ['./time-interval-form.component.scss']
})
export class TimeIntervalFormComponent extends BaseIntervalComponent implements OnInit {
  logger: HistorianService;
  timeIntervals = [];
  form: FormGroup;
  timeIntervalControl: FormControl;

  private defaultTimeInterval = IntervalEnum.Week;

  constructor(private currentTimeIntervalFacade: CurrentTimeIntervalFacadeService) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
    this.currentTimeIntervalFacade.setCurrentTimeInterval(IntervalSe[this.defaultTimeInterval]);
  }

  private calculateTimeBlock(interval: IntervalSe, subtractIntervals: number = 0): { start: Moment, end: Moment } {
    const now = momentJs();
    let timeBlock: StartOf;

    switch (interval) {
      case IntervalSe.Day:
        timeBlock = 'day';
        break;
      case IntervalSe.Week:
        timeBlock = 'week';
        break;
      case IntervalSe.Month:
        timeBlock = 'month';
        break;
      case IntervalSe.Year:
        timeBlock = 'year';
        break;
    }

    return {
      start: now.clone().utc().startOf('day').subtract(subtractIntervals, timeBlock),
      end: now.clone().utc().startOf('day')
    };
  }

  private buildForm(): void {
    const weekTimeBlockRange = this.calculateTimeBlock(IntervalSe.Week, 1);
    const monthTimeBlockRange = this.calculateTimeBlock(IntervalSe.Month, 1);

    this.timeIntervals.push({
      value: IntervalEnum.Week,
      text: this.formatIntervalTextDetail(IntervalEnum.Week, weekTimeBlockRange )
    });

    this.timeIntervals.push({
      value: IntervalEnum.Month,
      text: this.formatIntervalTextDetail(IntervalEnum.Month, monthTimeBlockRange)
    });

    this.timeIntervalControl = new FormControl();

    this.form = new FormGroup({
      timeInterval: this.timeIntervalControl
    });

    this.timeIntervalControl.setValue(this.defaultTimeInterval);

    this.timeIntervalControl.valueChanges.subscribe(newValue => this.currentTimeIntervalFacade.setCurrentTimeInterval(newValue));
  }
}
