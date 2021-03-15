import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import { MeetingsFeature} from './models/meetings-feature';
import { calendarEventsFeatureKey, calendarEventsReducer } from './reducers/calendar-events-reducer.reducer';

export const khakiMeetingsFeatureKey = 'khakiMeetings';

export const reducers: ActionReducerMap<MeetingsFeature> = {
  [calendarEventsFeatureKey]: calendarEventsReducer,
};

export const metaReducers: MetaReducer<MeetingsFeature>[] = [];
