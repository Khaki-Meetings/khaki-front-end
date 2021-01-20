import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HistorianService, Logging} from '@natr/historian';
import * as moment from 'moment';
import {Moment} from 'moment';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import StartOf = moment.unitOfTime.StartOf;

const momentJs = moment;

interface StartEndModel {
  start: Moment;
  end: Moment;
}

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

  private defaultTimeInterval = IntervalSe.Week;

  constructor(private statisticsFiltersFacade: StatisticsFiltersFacade) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.statisticsFiltersFacade.selectInterval()
      .subscribe(
        interval => {
          this.logger.debug('setting interval from state', interval);
          this.timeIntervalControl.patchValue(interval);
        }
      );
  }

  // noinspection JSMethodCanBeStatic
  private calculateTimeBlock(interval: IntervalSe, subtractIntervals: number = 0): StartEndModel {
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
    const weekTimeBlock = this.calculateTimeBlock(IntervalSe.Week, 1);
    const monthTimeBlock = this.calculateTimeBlock(IntervalSe.Month, 1);

    this.timeIntervals.push({
      value: IntervalSe.Week,
      start: weekTimeBlock.start,
      end: weekTimeBlock.end
    });

    this.timeIntervals.push({
      value: IntervalSe.Month,
      start: monthTimeBlock.start,
      end: monthTimeBlock.end
    });

    this.timeIntervalControl = new FormControl();

    this.form = new FormGroup({
      timeInterval: this.timeIntervalControl
    });

    this.timeIntervalControl.setValue(this.defaultTimeInterval);

    this.timeIntervalControl.valueChanges.subscribe(newValue => this.statisticsFiltersFacade.dispatchSetInterval(newValue));
  }
}
