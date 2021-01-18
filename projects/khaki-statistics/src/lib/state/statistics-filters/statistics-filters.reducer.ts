import {createReducer, on} from '@ngrx/store';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from '../models/interval-se';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {Utilities} from '../../services/utilities';
import {setStatisticsScopeAction} from './set-statistics-scope.actions';


export const statisticsFiltersAttributeKey = 'statisticsFilters';

export const initialState: StatisticsFiltersSm = {
  statisticsScope: StatisticsScopeSe.External,
  interval: IntervalSe.Week
};

export const statisticsFiltersReducer = createReducer(
  initialState,
  on(
    setStatisticsFiltersAction,
    (state, action) =>
      ({
        ...state,
        statisticsScope: action.statisticsFilters.statisticsScope,
        interval: action.statisticsFilters.interval,
        start: action.statisticsFilters.start,
        end: action.statisticsFilters.end,
      })
  ),
  on(
    setCurrentTimeIntervalAction,
    (state, action) => {
      const startEnd = Utilities.calculateTimeBlock(action.interval, 1);
      return {...state, interval: action.interval, start: startEnd.start};
    }
  ),
  on(
    setStatisticsScopeAction,
    (state, action) => {
      return {
        ...state,
        statisticsScope: action.scope
      };
    }
  )
);
