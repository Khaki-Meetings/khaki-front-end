import {createFeatureSelector, createSelector} from '@ngrx/store';
import { khakiMeetingsFeatureKey } from './index';
import { calendarEventsFeatureKey } from './reducers/calendar-events-reducer.reducer';
import { MeetingsFeature } from './models/meetings-feature';

const featureSelector = createFeatureSelector(khakiMeetingsFeatureKey);

export const calendarEventsSelector = createSelector(
  featureSelector,
  (state: MeetingsFeature) => state[calendarEventsFeatureKey]
);
