import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from './interval-se.enum';
import {Moment} from 'moment';

export interface StatisticsFiltersSm {
  statisticsScope: StatisticsScopeSe;
  interval: IntervalSe;
  start?: Moment;
  end?: Moment;
}
