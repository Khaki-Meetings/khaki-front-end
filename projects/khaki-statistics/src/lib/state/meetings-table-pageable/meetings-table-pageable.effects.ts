import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {map} from 'rxjs/operators';

import * as MeetingsTablePageableActions from './meetings-table-pageable.actions';
import {loadMeetingsListAction} from '../actions/meetings-list.actions';


@Injectable()
export class MeetingsTablePageableEffects {


  loadMeetingsTablePageables$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MeetingsTablePageableActions.setMeetingsTablePageablesAction),
      map(() => loadMeetingsListAction())
    );
  });

  constructor(private actions$: Actions) {
  }

}
