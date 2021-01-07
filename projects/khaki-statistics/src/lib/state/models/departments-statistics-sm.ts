import {DepartmentStatisticsSm} from './department-statistics-sm';
import {BaseStatisticsStateSm} from './base-statistics-state-sm';

export interface DepartmentsStatisticsSm extends BaseStatisticsStateSm {
  departmentsStatistics: DepartmentStatisticsSm[];
}
