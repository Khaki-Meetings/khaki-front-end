import {IntervalSe} from '../state/models/interval-se';
import {Moment} from 'moment/moment';
import * as moment from 'moment';
import StartOf = moment.unitOfTime.StartOf;

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
}
