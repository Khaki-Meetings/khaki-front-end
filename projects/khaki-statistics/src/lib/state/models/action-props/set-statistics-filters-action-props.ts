import {StatisticsFilterSe} from '../statistics-filter-se';
import {IntervalSe} from '../interval-se';

export interface SetStatisticsFiltersActionProps {
  filter: StatisticsFilterSe;
  interval: IntervalSe;
  page?: number;
  count?: number;
}
