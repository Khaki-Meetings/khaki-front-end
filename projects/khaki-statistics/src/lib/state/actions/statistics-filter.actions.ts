import {createAction, props} from '@ngrx/store';
import {PageableActionProps} from '../models/action-props/pageable-action-props';
import {StatisticsScopeSe} from '../statistics-filters/statistics-scope-se.enum';

export interface SetStatisticsScopeActionProp {
  statisticsScope: StatisticsScopeSe;
}

export const setStatisticsFilterAction = createAction(
  '[StatisticsFilter] Set StatisticsFilters',
  props<SetStatisticsScopeActionProp>()
);

export const setPageCountAction = createAction(
  '[StatisticsFilter] Set Page and Count',
  props<PageableActionProps>()
);


