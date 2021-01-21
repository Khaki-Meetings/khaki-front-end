import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {map} from 'rxjs/operators';

import * as OrganizersTablePageableActions from './organizers-table-pageable.actions';
import {loadOrganizersStatisticsAction} from '../actions/organizers-statistics.actions';


@Injectable()
export class OrganizersTablePageableEffects {


  loadOrganizersTablePageables$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrganizersTablePageableActions.setOrganizersTablePageablesAction),
      map(() => loadOrganizersStatisticsAction())
    );
  });

  constructor(private actions$: Actions) {
  }

}
