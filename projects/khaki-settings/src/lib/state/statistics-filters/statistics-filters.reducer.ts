import {createReducer, on} from '@ngrx/store';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from './interval-se.enum';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';

export const statisticsFiltersAttributeKey = 'statisticsFilters';

export const initialState: StatisticsFiltersSm = {
  interval: IntervalSe.Week,
  statisticsScope: StatisticsScopeSe.External,
  organizer: ''
};


export const statisticsFiltersReducer = createReducer(
  initialState,
  on(
    setStatisticsFiltersAction,
    (state, action) => {
      return action.statisticsFilters;
    }
  )
);
