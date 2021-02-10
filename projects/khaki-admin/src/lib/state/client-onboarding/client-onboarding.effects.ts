import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

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
      tap(data => this.logger.debug('before concatMap action is', data)),
      mergeMap((action) => {
          this.logger.debug('in exhaustMap', action);
          return this.khakiAdminService.saveOrganization({name: action.name, adminEmail: action.adminEmail}).pipe(
            tap(data => this.logger.debug('action is', data)),
            map(data => ClientOnboardingActions.saveClientOnboardingSuccess()),
            catchError((error: HttpErrorResponse) => {
                this.logger.debug('caught error', error);
                return of(ClientOnboardingActions.saveClientOnboardingFailure({errorCode: error.status, errorMessage: error.statusText}));
              }
            )
          );
        }
      )
    );
  });


  constructor(private actions$: Actions, private khakiAdminService: KhakiAdminService) {
  }

}
