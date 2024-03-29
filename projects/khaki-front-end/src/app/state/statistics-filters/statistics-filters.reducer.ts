import {createReducer, on} from '@ngrx/store';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from './interval-se.enum';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import * as momentJs from 'moment/moment';
import {StartEndModel} from './start-end.model';
import StartOf = momentJs.unitOfTime.StartOf;
import {CurrentLogLevel, HistorianService} from '@natr/historian';

const moment = momentJs;

const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'KhakiAppStatisticsFilters');

export const statisticsFiltersAttributeKey = 'statisticsFilters';

function calculateTimeBlock(interval: IntervalSe, subtractIntervals: number = 0): StartEndModel {
  const now = moment();
  let timeBlock: StartOf;
  switch (interval) {
    case IntervalSe.Day:
      timeBlock = 'day';
      break;
    case IntervalSe.Week:
      timeBlock = 'week';
      break;
    case IntervalSe.Month:
      timeBlock = 'month';
      break;
    case IntervalSe.Year:
      timeBlock = 'year';
      break;
  }

  const ret = {
    start: now.clone().utc().startOf('day').subtract(subtractIntervals, timeBlock),
    end: now.clone().utc().startOf('day')
  };

  logger.debug('start/end', ret);
  logger.debug('interval', interval);
  return ret;
}

function calculateCalendarTimeBlock(interval: IntervalSe, subtractIntervals: number = 0): StartEndModel {
  const now = moment();
  let timeBlock: StartOf;
  switch (interval) {
    case IntervalSe.Day:
      timeBlock = 'day';
      break;
    case IntervalSe.Week:
      timeBlock = 'week';
      break;
    case IntervalSe.Month:
      timeBlock = 'month';
      break;
    case IntervalSe.Year:
      timeBlock = 'year';
      break;
  }

  const ret = {
    start: now.clone().utc().startOf(timeBlock).subtract(subtractIntervals, timeBlock),
    end: now.clone().utc().startOf(timeBlock)
  };

  logger.debug('cal start/end', ret);
  logger.debug('cal interval', interval);
  return ret;
}

const startEnd = calculateTimeBlock(IntervalSe.Week, 1);
const calendarStartEnd = calculateCalendarTimeBlock(IntervalSe.Week, 1);

export const initialState: StatisticsFiltersSm = {
  interval: IntervalSe.Week,
  statisticsScope: StatisticsScopeSe.External,
  start: startEnd.start,
  end: startEnd.end,
  calendarStart: calendarStartEnd.start,
  calendarEnd: calendarStartEnd.end,
  organizer: '',
  department: ''
};


export const statisticsFiltersReducer = createReducer(
  initialState,
  on(
    setStatisticsFiltersAction,
    (state, action) => {
      const {type, ...typeLess} = action;
      console.log('state/action', state, action); // was natr-historian  this.logger.debug
      const newState = {
        ...state,
        ...typeLess
      };
      const se = calculateTimeBlock(newState.interval, 1);
      const cse = calculateCalendarTimeBlock(newState.interval, 1);
      newState.start = se.start;
      newState.end = se.end;
      newState.calendarStart = cse.start,
      newState.calendarEnd = cse.end,
      console.log('newState', newState); // was natr-historian  this.logger.debug
      return newState;
    }
  )
);
