import {StartEndModel} from './start-end.model';

import * as moment from 'moment/moment';
import StartOf = moment.unitOfTime.StartOf;
import {IntervalSe} from './interval-se.enum';

export abstract class BaseChildrenStatisticsFiltersEffects {
  protected calculateTimeBlock(interval: IntervalSe, subtractIntervals: number = 0): StartEndModel {

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

  protected calculateCalendarTimeBlock(interval: IntervalSe, subtractIntervals: number = 0): StartEndModel {
    return {start: undefined, end: undefined};
  }
}
