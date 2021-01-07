import {createAction, props} from '@ngrx/store';
import {StatisticsFilterSe} from '../models/statistics-filter-se';
import {PageCountActionProps} from '../models/action-props/page-count-action-props';

export interface SetStatisticsFilterActionProp {
  filter: StatisticsFilterSe;
}

export const setStatisticsFilterAction = createAction(
  '[StatisticsFilter] Set StatisticsFilters',
  props<SetStatisticsFilterActionProp>()
);

export const setPageCountAction = createAction(
  '[StatisticsFilter] Set Page and Count',
  props<PageCountActionProps>()
);


