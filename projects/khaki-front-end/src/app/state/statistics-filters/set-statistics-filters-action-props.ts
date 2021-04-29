import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from './interval-se.enum';
import {Moment} from 'moment/moment';
import { DepartmentSm } from 'projects/khaki-statistics/src/lib/state/models/department-sm';

export interface SetStatisticsFiltersActionProps {
  statisticsScope?: StatisticsScopeSe;
  interval?: IntervalSe;
  start?: Moment;
  end?: Moment;
  calendarStart?: Moment;
  calendarEnd?: Moment;
  organizer?: string;
  department?: DepartmentSm;
}
