import {createReducer, on} from '@ngrx/store';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from '../models/interval-se';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {Utilities} from '../../services/utilities';
import {setStatisticsScopeAction} from './set-statistics-scope.actions';
import {CurrentLogLevel, HistorianService} from '@natr/historian';
import {setIntervalAction} from './set-interval.actions';

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
    (state, action) =>
    {
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
