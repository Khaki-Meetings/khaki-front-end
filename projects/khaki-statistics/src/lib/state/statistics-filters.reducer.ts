import {createReducer, on} from '@ngrx/store';
import {StatisticsScopeSe} from './statistics-filters/statistics-scope-se.enum';
import {IntervalSe} from './models/interval-se';
import {Moment} from 'moment';
import {setStatisticsFiltersAction} from './statistics-filters/set-statistics-filters.actions';
import {setStartEndAction} from './statistics-filters/set-start-end.actions';


export const statisticsFiltersAttributeKey = 'statisticsFilters';

export interface StatisticsFiltersSm {
  statisticsScope: StatisticsScopeSe;
  interval: IntervalSe;
  start?: Moment;
  end?: Moment;
}

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
        statisticsScope: action.statisticsScope,
        interval: action.interval
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
  )
);
