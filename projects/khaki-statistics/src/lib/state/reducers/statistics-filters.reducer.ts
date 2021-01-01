import {createReducer, on} from '@ngrx/store';
import {StatisticsFilterSe} from '../models/statistics-filter-se';
import {setStatisticsFiltersAction} from '../actions/set-statistics-filter.actions';
import {IntervalSe} from '../models/interval-se';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';


export const statisticsFiltersFeatureKey = 'statisticsFilters';

export interface StatisticsFiltersState {
  filter: StatisticsFilterSe;
  interval: IntervalSe;
  page?: number;
  count?: number;
}

export const initialState: StatisticsFiltersState = {
  filter: StatisticsFilterSe.Internal,
  interval: IntervalSe.Week
};

export const setStatisticsFilterReducer = createReducer(
  initialState,
  on(
    setStatisticsFiltersAction,
    (state, action) => {
      return {
        ...state,
        filter: action.filter,
        interval: action.interval,
        count: action.count,
        page: action.page
      };
    }
  ),
  on(
    setCurrentTimeIntervalAction,
    (state, action) => {
      return {...state, interval: action.interval};
    }
  )
);

