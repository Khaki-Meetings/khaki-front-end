import {createReducer, on} from '@ngrx/store';
import {StatisticsFilterSe} from '../models/statistics-filter-se';
import {setStatisticsFiltersAction} from '../actions/set-statistics-filter.actions';
import {IntervalSe} from '../models/interval-se';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {HistorianService, LogLevel} from '@natr/historian';
import {setStatisticsFilterAction} from '../actions/statistics-filter.actions';
import {Moment} from 'moment/moment';
import {Utilities} from '../../services/utilities';

// noinspection JSUnusedLocalSymbols
const logger = new HistorianService(LogLevel.DEBUG, 'StatisticsFilterReducer');

export const statisticsFiltersFeatureKey = 'statisticsFilters';

export interface StatisticsFiltersState {
  filter: StatisticsFilterSe;
  interval: IntervalSe;
  start: Moment;
  end: Moment;
  page?: number;
  count?: number;
}

export const initialState: StatisticsFiltersState = {
  filter: StatisticsFilterSe.Internal,
  start: Utilities.calculateTimeBlock(IntervalSe.Week, 0).start,
  end: Utilities.calculateTimeBlock(IntervalSe.Week, 0).end,
  interval: IntervalSe.Week
};

export const setStatisticsFilterReducer = createReducer(
  initialState,
  on(
    setStatisticsFiltersAction,
    (state, action) => {
      const startEnd = Utilities.calculateTimeBlock(action.interval);
      return {
        ...state,
        filter: action.filter,
        interval: action.interval,
        count: action.count,
        page: action.page,
        start: startEnd.start,
        end: startEnd.end,
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
    setStatisticsFilterAction,
    (state, action) => {
      return {
        ...state,
        filter: action.filter
      };
    }
  )
);
