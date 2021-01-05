import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IntervalEnum} from '../../services/models/interval.enum';
import {HistorianService, Logging} from '@natr/historian';
import {CurrentTimeIntervalFacadeService} from '../../state/facades/current-time-interval-facade.service';
import {IntervalSe} from '../../state/models/interval-se';
import {StatisticsService} from '../../services/statistics.service';
import * as moment from 'moment';

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

  constructor(private currentTimeIntervalFacade: CurrentTimeIntervalFacadeService,
    private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.currentTimeIntervalFacade.setCurrentTimeInterval(IntervalSe[this.defaultTimeInterval]);
  }

  private buildForm(): void {

    let weekTimeBlockRange = this.statisticsService.getStartEnd(IntervalEnum.Week);
    let monthTimeBlockRange = this.statisticsService.getStartEnd(IntervalEnum.Month);

    this.timeIntervals.push({
      value: IntervalEnum.Week,
      text: "Last 7 Days ("
        + moment(weekTimeBlockRange.start).format('ddd, MMM D')
        + " - "
        + moment(weekTimeBlockRange.end).format('ddd, MMM D') + ")" });
    this.timeIntervals.push({
      value: IntervalEnum.Month,
      text: "Last Month ("
        + moment(monthTimeBlockRange.start).format('ddd, MMM D')
        + " - "
        + moment(monthTimeBlockRange.end).format('ddd, MMM D') + ")" });

    this.timeIntervalControl = new FormControl();
    this.form = new FormGroup({
      timeInterval: this.timeIntervalControl
    });

    this.timeIntervalControl.setValue(this.defaultTimeInterval);

    this.timeIntervalControl.valueChanges.subscribe(newValue => this.currentTimeIntervalFacade.setCurrentTimeInterval(newValue));
  }

}
