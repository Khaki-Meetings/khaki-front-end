import {BaseStatisticsStateSm} from './base-statistics-state-sm';
import { DepartmentsStatisticsSm } from './departments-statistics-sm';

export interface DepartmentsStatisticsAggSm extends BaseStatisticsStateSm {
  internal: DepartmentsStatisticsSm;
  external: DepartmentsStatisticsSm;
}
