import {initialState, statisticsFiltersReducer} from './statistics-filters.reducer';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {SetStatisticsFiltersActionProps} from './set-statistics-filters-action-props';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {IntervalSe} from './interval-se.enum';
import * as moment from 'moment';
import {SetStartEndActionProps} from './set-start-end-action-props';
import {setStartEndAction} from './set-start-end.actions';

describe('StatisticsFilters Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = statisticsFiltersReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('setStatisticsFiltersAction',
    () => {
      it(
        'should have state set to match props',
        () => {
          const props = {
            statisticsFilters: {
              statisticsScope: StatisticsScopeSe.External,
              interval: IntervalSe.Week,
              start: moment(),
              end: moment()
            }
          } as SetStatisticsFiltersActionProps;
          const newState = statisticsFiltersReducer(initialState, setStatisticsFiltersAction(props));

          expect(newState).toEqual(props.statisticsFilters);
        }
      );
    }
  );

  describe('setStartEndAction',
    () => {
      it(
        'should have state with matching start and end properties',
        () => {
          const props = {
            start: moment(),
            end: moment()
          } as SetStartEndActionProps;
          const newState = statisticsFiltersReducer(initialState, setStartEndAction(props));

          expect(newState.start).toEqual(props.start);
          expect(newState.end).toEqual(props.end);
        }
      );
    }
  );
});
