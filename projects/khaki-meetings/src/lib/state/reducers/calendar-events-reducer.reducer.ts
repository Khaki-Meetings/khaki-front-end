import { Action, createReducer, on, MetaReducer, ActionReducerMap } from '@ngrx/store';
import { CalendarEventsResponseDto } from '../../services/models/calendarEventsResponseDto';
import { loadCalendarEvents, loadCalendarEventsSuccess} from '../actions/calendar-events.actions';
import { MeetingsFeature } from '../models/meetings-feature';

export const calendarEventsFeatureKey = 'calendarEvents';

export const initialState: CalendarEventsResponseDto = {
  calendarEvents: []
};

export const calendarEventsReducer = createReducer(
  initialState,
  on(loadCalendarEvents, (state: CalendarEventsResponseDto, action) => state),
  on(
    loadCalendarEventsSuccess,
    (state: CalendarEventsResponseDto, action) => {
      const {type, ...newState} = {...state, ...action};
      newState.calendarEvents = newState.calendarEvents.map(
        calendarEvent => {
          let newDate = new Date(calendarEvent.eventStartDate);
          var newEventEndDate = newDate;
          newEventEndDate = new Date(newDate.getTime() + (calendarEvent.eventLengthSeconds * 1000));
          return {
            eventLengthSeconds: calendarEvent.eventLengthSeconds,
            eventStartDate: newDate,
            eventStartTime: calendarEvent.eventStartTime,
            eventEndDate: newEventEndDate,
            eventEndTime: calendarEvent.eventEndTime,
            title: calendarEvent.title,
            numAttendees: calendarEvent.numAttendees
          };
        }
      );
      return newState;
    }
  )
);
