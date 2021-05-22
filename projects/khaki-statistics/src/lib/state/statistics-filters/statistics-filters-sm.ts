import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from './interval-se.enum';
import {Moment} from 'moment';
import { DepartmentSm } from '../models/department-sm';

export interface StatisticsFiltersSm {
  statisticsScope: StatisticsScopeSe;
  interval: IntervalSe;
  start?: Moment;
  end?: Moment;
  calendarStart?: Moment;
  calendarEnd?: Moment;
  organizer?: string;
  department?: string;
}
