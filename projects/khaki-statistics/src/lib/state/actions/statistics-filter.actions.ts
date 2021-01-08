import {createAction, props} from '@ngrx/store';
import {StatisticsFilterSe} from '../models/statistics-filter-se';
import {PageableActionProps} from '../models/action-props/pageable-action-props';

export interface SetStatisticsFilterActionProp {
  filter: StatisticsFilterSe;
}

export const setStatisticsFilterAction = createAction(
  '[StatisticsFilter] Set StatisticsFilters',
  props<SetStatisticsFilterActionProp>()
);

export const setPageCountAction = createAction(
  '[StatisticsFilter] Set Page and Count',
  props<PageableActionProps>()
);


