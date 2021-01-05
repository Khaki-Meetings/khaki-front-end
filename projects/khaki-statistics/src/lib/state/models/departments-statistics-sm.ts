import {DepartmentStatisticsSm} from './department-statistics-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {StatisticsQueryParameters} from '../../services/models/statistics-query-parameters';

export interface DepartmentsStatisticsSm {
  departmentsStatistics: DepartmentStatisticsSm[];
  errors?: Error[];
  interval?: IntervalEnum;
  statisticsQueryParams?: StatisticsQueryParameters;
}
