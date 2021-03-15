import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { MeetingsFeature} from '../models/meetings-feature';
import {Store} from '@ngrx/store';
import {loadCalendarEvents} from '../actions/calendar-events.actions';
import {calendarEventsSelector} from '../calendarevents.selectors';
import { KhakiMeetingsService } from '../../khaki-meetings.service';
import { CalendarEventsResponseDto } from '../../services/models/calendarEventsResponseDto';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventsFacadeService {

  constructor(private store: Store<MeetingsFeature>, private service: KhakiMeetingsService) {
  }

  requestCalendarEvents(count: number, page: number): void {
    this.store.dispatch(loadCalendarEvents({count, page}));
  }

  calendarEvents(count: number, page: number): Observable<CalendarEventsResponseDto> {
    return this.store.select(calendarEventsSelector);
  }
}
