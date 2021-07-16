import {createReducer, on} from '@ngrx/store';
import {CurrentLogLevel, HistorianService} from '@natr/historian';
import { TeamsFiltersSm } from './teams-filters-sm';
import { setTeamsFiltersAction } from './set-teams-filters.actions';

const logger = new HistorianService(CurrentLogLevel.LOG_LEVEL, 'StatisticsModuleStatisticsFilters');

export const teamsFiltersAttributeKey = 'teamsFilters';

export const initialState: TeamsFiltersSm = {
  attendee: ''
};

export const teamsFiltersReducer = createReducer(
  initialState,
  on(
    setTeamsFiltersAction,
    (state, action) => {
      return {
        ...state,
        attendee: action.attendee
      }
    }
  )
);
