import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadUserProfile, loadUserProfileSuccess} from '../actions/user-profile.actions';
import {catchError, map, tap, switchMap} from 'rxjs/operators';
import {SettingsService} from '../../services/profile.service';
import {of} from 'rxjs';


@Injectable()
export class ProfileEffects {

  userProfileEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadUserProfile),
      switchMap(
        (action) => this.settingsService.getUserProfile()
          .pipe(
            map(organizersStatistics => loadUserProfileSuccess(organizersStatistics))
          )
      )
    )
  );

  constructor(private actions$: Actions, private settingsService: SettingsService) {
  }

}
