import { createAction, props } from '@ngrx/store';
import {SetStatisticsFiltersActionProps} from './set-statistics-filters-action-props';

export const setStatisticsFiltersAction = createAction(
  '[Khaki Statistics] Set Statistics Filters',
  props<SetStatisticsFiltersActionProps>()
);
