import {IntervalSe} from '../interval-se';
import {StatisticsScopeSe} from '../../statistics-filters/statistics-scope-se.enum';

export interface SetStatisticsFiltersActionProps {
  filter?: StatisticsScopeSe;
  interval?: IntervalSe;
  page?: number;
  count?: number;
}
