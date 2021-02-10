import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap, tap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as ClientOnboardingActions from './client-onboarding.actions';
import {HistorianService, Logging} from '@natr/historian';
import {KhakiAdminService} from '../../khaki-admin.service';
import {HttpErrorResponse} from '@angular/common/http';

@Logging
@Injectable()
export class ClientOnboardingEffects {
  private logger: HistorianService;

  loadClientOnboarding$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClientOnboardingActions.saveClientOnboarding),
      concatMap((action) =>
        this.khakiAdminService.saveOrganization({name: action.name, adminEmail: action.adminEmail}).pipe(
          map(data => ClientOnboardingActions.saveClientOnboardingSuccess()),
          catchError((error: HttpErrorResponse) => {
            this.logger.debug('caught error', error);
            return of(ClientOnboardingActions.saveClientOnboardingFailure({errorCode: error.status, errorMessage: error.statusText}));
          }))
      )
    );
  });


  constructor(private actions$: Actions, private khakiAdminService: KhakiAdminService) {
  }

}
