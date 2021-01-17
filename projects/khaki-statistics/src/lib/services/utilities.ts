import {IntervalSe} from '../state/models/interval-se';
import {Moment} from 'moment';
import * as momentJs from 'moment';
import StartOf = moment.unitOfTime.StartOf;
import { IntervalEnum } from './models/interval.enum';
import {StatisticsScopeSe} from '../state/statistics-filters/statistics-scope-se.enum';

const moment = momentJs;

export class Utilities {
  static formatHrsMins(seconds: number): string {

    const hours = Math.trunc(seconds / 60 / 60);
    const minutes = Math.trunc(seconds / 60 % 60);

    let hoursLabel = 'hrs';
    if (hours === 1) {
      hoursLabel = 'hr';
    }

    const minutesLabel = 'mins';

    return hours + ' ' + hoursLabel + ', ' + minutes + ' ' + minutesLabel;
  }

  static calculateTimeBlock(interval: IntervalSe, subtractIntervals: number = 0): { start: Moment, end: Moment } {
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
      start: now.clone().utc().startOf('day').subtract(subtractIntervals, timeBlock),
      end: now.clone().utc().startOf('day')
    };
  }

  static calculateCalendarTimeBlock(interval: IntervalSe, subtractIntervals: number = 0): { start: Moment, end: Moment } {
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
  static calculateTimeBlockEnum(interval: IntervalEnum, subtractIntervals: number = 0): { start: Moment, end: Moment } {
    const now = moment();
    let timeBlock: moment.unitOfTime.DurationConstructor;
    switch (interval) {
      case IntervalEnum.Week:
        timeBlock = 'week';
        break;
      case IntervalEnum.Month:
        timeBlock = 'month';
        break;
    }

    return {
      start: now.clone().utc().startOf(timeBlock).subtract(subtractIntervals, timeBlock),
      end: now.clone().utc().startOf(timeBlock)
    };
  }

  static setDisplayEnd(timestamp: moment.Moment): moment.Moment {
    if (timestamp.hour() === 0
      && timestamp.minutes() === 0
      && timestamp.seconds() === 0) {
      return timestamp.subtract(1, 'days').endOf('day');
    }
    return timestamp;
  }

  static formatIntervalTextDetail(interval: IntervalEnum, timeblockRange: { start: Moment, end: Moment } ): string {

    var intervalLabel = '7 days';
    if (interval == IntervalEnum.Month) {
      intervalLabel = 'Month';
    }
    var startDate = moment(timeblockRange.start).format('ddd, MMM D');

    var endDate = Utilities.setDisplayEnd(moment(timeblockRange.end)).format('ddd, MMM D');

    return 'Last ' + intervalLabel + ' (' + startDate + ' - ' + endDate + ')';

  }

  static formatMeetingTypeDetail(statisticsFilterSe: StatisticsScopeSe) {
    if (statisticsFilterSe == StatisticsScopeSe.Internal) {
      return 'Internal Meetings Only';
    }
    return 'All Meetings';
  }

}
