import {createReducer, on} from '@ngrx/store';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from '../models/interval-se';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {setStatisticsScopeAction} from './set-statistics-scope.actions';
import {CurrentLogLevel, HistorianService} from '@natr/historian';
import { setCurrentDepartmentAction } from '../actions/current-departments.action';

const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'StatisticsModuleStatisticsFilters');

export const statisticsFiltersAttributeKey = 'statisticsFilters';

export const initialState: StatisticsFiltersSm = {
  statisticsScope: StatisticsScopeSe.External,
  interval: IntervalSe.Week,
  department: ""
};

export const statisticsFiltersReducer = createReducer(
  initialState,
  on(
    setStatisticsFiltersAction,
    (state, action) => {
      console.log('state/action', state, action);  // was natr-historian  this.logger.debug
      return {
        ...state,
        statisticsScope: action.statisticsFilters.statisticsScope,
        interval: action.statisticsFilters.interval,
        start: action.statisticsFilters.start,
        end: action.statisticsFilters.end,
        calendarStart: action.statisticsFilters.calendarStart,
        calendarEnd: action.statisticsFilters.calendarEnd,
        organizer: action.statisticsFilters.organizer,
        department: action.statisticsFilters.department
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
    setCurrentDepartmentAction,
    (state, action) => {
      return {...state, department: action.department};
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
