import {createAction, props} from '@ngrx/store';
import {SetStatisticsFiltersActionProps} from '../models/action-props/set-statistics-filters-action-props';

export const setStatisticsFiltersAction = createAction(
  '[SetStatisticsFilter] Load SetStatisticsFilters',
  props<SetStatisticsFiltersActionProps>()
);




