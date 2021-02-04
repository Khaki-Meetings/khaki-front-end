import {SortDirection} from '@angular/material/sort';

export interface PageableActionProps {
  count: number;
  page: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
}
