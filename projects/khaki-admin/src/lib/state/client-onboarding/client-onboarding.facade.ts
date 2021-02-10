import {Injectable} from '@angular/core';
import {KhakiAdminSm} from '../index';
import {Store} from '@ngrx/store';
import {SaveClientOnboardingActionProps} from './save-client-onboarding-action-props';
import {saveClientOnboarding, saveClientOnboardingFailure, saveClientOnboardingSuccess} from './client-onboarding.actions';
import {Observable} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {HistorianService, Logging} from '@natr/historian';
import {map} from 'rxjs/operators';

@Logging
@Injectable({providedIn: 'root'})
export class ClientOnboardingFacade {

  constructor(private store: Store<KhakiAdminSm>, private actions: Actions) {
  }

  private logger: HistorianService;

  dispatchSaveClientOnboarding(props: SaveClientOnboardingActionProps): void {
    this.logger.debug('dispatchSaveClientOnboarding', props);
    this.store.dispatch(saveClientOnboarding(props));
  }

  selectSaveClientOnboardingSuccess(): Observable<void> {
    return this.actions.pipe(
      ofType(saveClientOnboardingSuccess),
    );
  }

  selectSaveClientOnboardingFailure(): Observable<string> {
    return this.actions.pipe(
      ofType(saveClientOnboardingFailure),
      map(action => action.errorMessage)
    );
  }
}
