import {Moment} from 'moment/moment';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from './interval-se.enum';

export interface StatisticsFiltersSm {
  statisticsScope: StatisticsScopeSe;
  interval: IntervalSe;
  start: Moment;
  end: Moment;
  calendarStart: Moment;
  calendarEnd: Moment;
  organizer: string;
  department: string;
//  attendee: string;
}
