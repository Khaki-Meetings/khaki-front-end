import {createAction, props} from '@ngrx/store';
import {StatisticsFilterSe} from '../models/statistics-filter-se';

export interface SetStatisticsFilterActionProp {
  filter: StatisticsFilterSe;
}

export const setStatisticsFilterAction = createAction(
  '[StatisticsFilter] Set StatisticsFilters',
  props<SetStatisticsFilterActionProp>()
);




