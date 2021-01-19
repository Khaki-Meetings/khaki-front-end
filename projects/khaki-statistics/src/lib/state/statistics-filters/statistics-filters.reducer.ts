import {createReducer, on} from '@ngrx/store';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from '../models/interval-se';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {setStatisticsScopeAction} from './set-statistics-scope.actions';
import {CurrentLogLevel, HistorianService} from '@natr/historian';

const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'StatisticsModuleStatisticsFilters');

export const statisticsFiltersAttributeKey = 'statisticsFilters';

export const initialState: StatisticsFiltersSm = {
  statisticsScope: StatisticsScopeSe.External,
  interval: IntervalSe.Week
};

export const statisticsFiltersReducer = createReducer(
  initialState,
  on(
    setStatisticsFiltersAction,
    (state, action) => {
      logger.debug('state/action', state, action);
      return {
        ...state,
        statisticsScope: action.statisticsFilters.statisticsScope,
        interval: action.statisticsFilters.interval,
        start: action.statisticsFilters.start,
        end: action.statisticsFilters.end,
      };
    }
  ),
  on(
    setCurrentTimeIntervalAction,
    (state, action) => {
      return {...state, interval: action.interval};
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
