import { CalendarEventsResponseDto } from '../../services/models/calendarEventsResponseDto';
import { calendarEventsFeatureKey } from '../reducers/calendar-events-reducer.reducer';

export interface MeetingsFeature {
  [calendarEventsFeatureKey]: CalendarEventsResponseDto;
}
