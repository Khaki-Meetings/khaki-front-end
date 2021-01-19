import {Logging} from '@natr/historian';
import * as momentJs from 'moment';
import {Moment} from 'moment';
import {StatisticsScopeSe} from '../state/statistics-filters/statistics-scope-se.enum';
import {IntervalSe} from '../state/statistics-filters/interval-se.enum';

const moment = momentJs;

@Logging
export class BaseIntervalComponent {
  constructor() {
  }

  protected setDisplayEnd(timestamp: Moment): Moment {
    return (
      timestamp.hour() === 0 &&
      timestamp.minutes() === 0 &&
      timestamp.seconds() === 0
    ) ? timestamp.subtract(1, 'days').endOf('day') : timestamp;
  }

  protected formatIntervalTextDetail(interval: IntervalSe, timeblockRange: { start: Moment, end: Moment }): string {
    const intervalLabel = (interval === IntervalSe.Month) ? 'Month' : '7 days';
    const startDate = moment(timeblockRange.start).format('ddd, MMM D');
    const endDate = this.setDisplayEnd(moment(timeblockRange.end)).format('ddd, MMM D');

    return 'Last ' + intervalLabel + ' (' + startDate + ' - ' + endDate + ')';
  }

  protected formatMeetingTypeDetail(statisticsFilterSe: StatisticsScopeSe): string {
    return (statisticsFilterSe === StatisticsScopeSe.Internal) ? 'Internal Meetings Only' : 'All Meetings';
  }
}
