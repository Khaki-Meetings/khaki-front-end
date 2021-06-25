import {SortDirection} from '@angular/material/sort';

export interface StatisticsQueryParameters {
  page?: number;
  count?: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
}
