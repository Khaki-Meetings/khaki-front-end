import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HistorianService, Logging} from '@natr/historian';
import * as moment from 'moment';
import {Moment} from 'moment';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {IntervalSe} from '../../state/statistics-filters/interval-se.enum';
import StartOf = moment.unitOfTime.StartOf;
import { GoogleAnalyticsService } from '../../google-analytics.service';

const momentJs = moment;

interface StartEndModel {
  start: Moment;
  end: Moment;
}

@Logging
@Component({
  selector: 'lib-time-interval-form',
  templateUrl: './time-interval-form.component.html',
  styleUrls: ['./time-interval-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimeIntervalFormComponent implements OnInit {
  logger: HistorianService;
  timeIntervals = [];
  form: FormGroup;
  timeIntervalControl: FormControl;

  private defaultTimeInterval = IntervalSe.Week;

  constructor(private statisticsFiltersFacade: StatisticsFiltersFacade,
      public googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.statisticsFiltersFacade.selectInterval()
      .subscribe(
        interval => {
          console.log('setting interval from state', interval); // was natr-historian  this.logger.debug
          this.timeIntervalControl.patchValue(interval);
        }
      );
    this.onChanges();
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

  private calculateCalendarTimeBlock(interval: IntervalSe, subtractIntervals: number = 0): StartEndModel {
    const now = moment();
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
      start: now.clone().utc().startOf(timeBlock).subtract(subtractIntervals, timeBlock),
      end: now.clone().utc().startOf(timeBlock)
    };
  }

  private buildForm(): void {
    const weekTimeBlock = this.calculateTimeBlock(IntervalSe.Week, 1);
    const monthTimeBlock = this.calculateTimeBlock(IntervalSe.Month, 1);
    const calendarWeekTimeBlock = this.calculateCalendarTimeBlock(IntervalSe.Week, 1);
    const calendarMonthTimeBlock = this.calculateCalendarTimeBlock(IntervalSe.Month, 1);

    this.timeIntervals.push({
      value: IntervalSe.Week,
      start: weekTimeBlock.start,
      end: weekTimeBlock.end,
      calendarStart: calendarWeekTimeBlock.start,
      calendarEnd: calendarWeekTimeBlock.end
    });

    this.timeIntervals.push({
      value: IntervalSe.Month,
      start: monthTimeBlock.start,
      end: monthTimeBlock.end,
      calendarStart: calendarMonthTimeBlock.start,
      calendarEnd: calendarMonthTimeBlock.end
    });

    console.log("Time Intervals: " + JSON.stringify(this.timeIntervals));

    this.timeIntervalControl = new FormControl();

    this.form = new FormGroup({
      timeInterval: this.timeIntervalControl
    });

    this.timeIntervalControl.setValue(this.defaultTimeInterval);

    this.timeIntervalControl.valueChanges.subscribe(newValue => {
      this.statisticsFiltersFacade.dispatchSetInterval(newValue)
    });
  }

  onChanges(): void {
    this.timeIntervalControl.valueChanges.subscribe(newValue => {
      this.googleAnalyticsService.eventEmitter("change_time_interval",
        "engagement", "change_time_interval_action", "change_time_interval",
        newValue);
    });

  }
}
