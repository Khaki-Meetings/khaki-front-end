import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, tap, switchMap} from 'rxjs/operators';
import {KhakiMeetingsService} from '../../khaki-meetings.service';
import {of} from 'rxjs';
import { loadCalendarEvents, loadCalendarEventsSuccess } from '../actions/calendar-events.actions';

@Injectable()
export class MeetingsEffects {

  constructor(private actions$: Actions, private khakiMeetingsService: KhakiMeetingsService) {
  }

  meetingsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadCalendarEvents),
      switchMap(
        (action) => this.khakiMeetingsService.loadCalendarEvents(action.count, action.page)
          .pipe(
            map(calendarEvents => loadCalendarEventsSuccess(calendarEvents))
          )
      )
    )
  );

}
