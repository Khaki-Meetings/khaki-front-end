import {IntervalSe} from '../interval-se';
import {StatisticsScopeSe} from '../../statistics-filters/statistics-scope-se.enum';
import { DepartmentSm } from '../department-sm';

export interface SetStatisticsFiltersActionProps {
  filter?: StatisticsScopeSe;
  interval?: IntervalSe;
  department?: DepartmentSm;
  page?: number;
  count?: number;
}
