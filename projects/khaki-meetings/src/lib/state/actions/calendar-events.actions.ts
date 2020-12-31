import {createAction, props} from '@ngrx/store';
import {CalendarEventsResponseDto} from '../../services/models/calendarEventsResponseDto';

export interface CalendarEventsActionProp {
  page?: number;
  count?: number;
}

export const loadCalendarEvents = createAction(
  '[CalendarEventsResponse] Load',
  props<CalendarEventsActionProp>()
);

export const loadCalendarEventsSuccess = createAction(
  '[CalendarEventsResponse] Load Success',
  props<CalendarEventsResponseDto>()
);
