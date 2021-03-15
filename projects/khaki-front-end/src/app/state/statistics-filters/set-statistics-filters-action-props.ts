import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from './interval-se.enum';
import {Moment} from 'moment/moment';

export interface SetStatisticsFiltersActionProps {
  statisticsScope?: StatisticsScopeSe;
  interval?: IntervalSe;
  start?: Moment;
  end?: Moment;
  organizer?: string;
}
