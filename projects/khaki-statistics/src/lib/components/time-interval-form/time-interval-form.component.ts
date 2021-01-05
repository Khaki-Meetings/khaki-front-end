import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IntervalEnum} from '../../services/models/interval.enum';
import {HistorianService, Logging} from '@natr/historian';
import {CurrentTimeIntervalFacadeService} from '../../state/facades/current-time-interval-facade.service';
import {IntervalSe} from '../../state/models/interval-se';
import * as moment_ from 'moment';
import {Moment} from 'moment';
import {StatisticsFiltersFacadeService} from '../../state/facades/statistics-filters-facade.service';
import {Utilities} from '../../services/utilities';

const moment = moment_;

@Logging
@Component({
  selector: 'lib-time-interval-form',
  templateUrl: './time-interval-form.component.html',
  styleUrls: ['./time-interval-form.component.scss']
})
export class TimeIntervalFormComponent implements OnInit {
  logger: HistorianService;
  timeIntervals = [];
  form: FormGroup;
  timeIntervalControl: FormControl;

  private defaultTimeInterval = IntervalEnum.Week;

  constructor(private currentTimeIntervalFacade: CurrentTimeIntervalFacadeService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.currentTimeIntervalFacade.setCurrentTimeInterval(IntervalSe[this.defaultTimeInterval]);
  }

  setDisplayEnd(timestamp: moment.Moment): moment.Moment {
    if (timestamp.hour() === 0
      && timestamp.minutes() === 0
      && timestamp.seconds() === 0) {
      return timestamp.subtract(1, 'days').endOf('day');
    }
    return timestamp;
  }

  private buildForm(): void {

    const weekTimeBlockRange = Utilities.calculateTimeBlock(IntervalSe.Week);
    const monthTimeBlockRange = Utilities.calculateTimeBlock(IntervalSe.Month);

    this.timeIntervals.push({
      value: IntervalEnum.Week,
      text: 'Last 7 Days ('
        + moment(weekTimeBlockRange.start).format('ddd, MMM D')
        + ' - '
        + this.setDisplayEnd(moment(weekTimeBlockRange.end)).format('ddd, MMM D') + ')'
    });
    this.timeIntervals.push({
      value: IntervalEnum.Month,
      text: 'Last Month ('
        + moment(monthTimeBlockRange.start).format('ddd, MMM D')
        + ' - '
        + this.setDisplayEnd(moment(monthTimeBlockRange.end)).format('ddd, MMM D') + ')'
    });

    this.timeIntervalControl = new FormControl();
    this.form = new FormGroup({
      timeInterval: this.timeIntervalControl
    });

    this.timeIntervalControl.setValue(this.defaultTimeInterval);

    this.timeIntervalControl.valueChanges.subscribe(newValue => this.currentTimeIntervalFacade.setCurrentTimeInterval(newValue));
  }
}
