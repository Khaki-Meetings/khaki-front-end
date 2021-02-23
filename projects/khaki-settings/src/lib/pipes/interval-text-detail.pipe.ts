import {Pipe, PipeTransform} from '@angular/core';
import {IntervalSe} from '../state/statistics-filters/interval-se.enum';
import {Moment} from 'moment/moment';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Pipe({name: 'intervalTextDetail'})
export class IntervalTextDetailPipe implements PipeTransform {
  private logger: HistorianService;

  private static setDisplayEnd(date: Moment): Moment {
    if (date.hour() === 0
      && date.minutes() === 0
      && date.seconds() === 0) {
      return date.subtract(1, 'days').endOf('day');
    }
    return date;
  }

  transform(value: IntervalSe, start: Moment, end: Moment): string {
    this.logger.debug('value', value);
    this.logger.debug('start/end', start, end);
    const intervalLabel = value === IntervalSe.Month ? 'Month' : '7 days';
    const startDate = start.format('ddd, MMM D');

    const endDate = IntervalTextDetailPipe.setDisplayEnd(end);

    return 'Trailing ' + intervalLabel + ' (' + startDate + ' - ' + endDate.format('ddd, MMM D') + ')';
  }
}
