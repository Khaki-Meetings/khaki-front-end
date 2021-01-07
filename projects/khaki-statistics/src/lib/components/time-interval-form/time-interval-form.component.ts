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

  private buildForm(): void {

    const weekTimeBlockRange = Utilities.calculateTimeBlock(IntervalSe.Week, 1);
    const monthTimeBlockRange = Utilities.calculateTimeBlock(IntervalSe.Month, 1);

    this.timeIntervals.push({
      value: IntervalEnum.Week,
      text: Utilities.formatIntervalTextDetail(IntervalEnum.Week,
         weekTimeBlockRange )
    });
    this.timeIntervals.push({
      value: IntervalEnum.Month,
      text: Utilities.formatIntervalTextDetail(IntervalEnum.Month,
         monthTimeBlockRange)
    });

    this.timeIntervalControl = new FormControl();
    this.form = new FormGroup({
      timeInterval: this.timeIntervalControl
    });

    this.timeIntervalControl.setValue(this.defaultTimeInterval);

    this.timeIntervalControl.valueChanges.subscribe(newValue => this.currentTimeIntervalFacade.setCurrentTimeInterval(newValue));
  }
}
