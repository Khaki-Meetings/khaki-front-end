import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as ClientOnboardingActions from './client-onboarding.actions';


@Injectable()
export class ClientOnboardingEffects {

  loadClientOnboarding$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClientOnboardingActions.saveClientOnboarding),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => ClientOnboardingActions.saveClientOnboardingSuccess()),
          catchError(error => of(ClientOnboardingActions.saveClientOnboardingFailure(error))))
      )
    );
  });


  constructor(private actions$: Actions) {
  }

}
