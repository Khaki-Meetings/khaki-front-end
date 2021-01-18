import {createReducer, on} from '@ngrx/store';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from '../models/interval-se';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {setStartEndAction} from './set-start-end.actions';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {setPageCountAction, setStatisticsFilterAction} from '../actions/statistics-filter.actions';
import {Utilities} from '../../services/utilities';


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
    setStartEndAction,
    (state, action) =>
      ({
        ...state,
        start: action.start,
        end: action.end
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
    setStatisticsFilterAction,
    (state, action) => {
      return {
        ...state,
        statisticsScope: action.statisticsScope
      };
    }
  ),
  on(
    setPageCountAction,
    (state, action) =>
      ({...state, count: action.count, page: action.page})
  )
);
