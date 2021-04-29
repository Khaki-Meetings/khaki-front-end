import {StatisticsScopeSe} from '../../state/statistics-filters/statistics-scope-se.enum';
import {SortDirection} from '@angular/material/sort';
import { DepartmentSm } from '../../state/models/department-sm';

export interface StatisticsQueryParameters {
  page?: number;
  count?: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
  statisticsScope?: StatisticsScopeSe;
  department?: DepartmentSm;
}
