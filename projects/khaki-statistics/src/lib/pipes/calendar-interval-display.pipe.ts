import {Pipe, PipeTransform} from '@angular/core';
import {IntervalSe} from '../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Pipe({name: 'calendarIntervalDisplay'})
export class CalendarIntervalDisplayPipe implements PipeTransform {
  private logger: HistorianService;

  transform(value: IntervalSe): string {
    const intervalLabel = value === IntervalSe.Month ? 'Months' : 'Weeks';
    return 'Previous 12 ' + intervalLabel;
  }
}
