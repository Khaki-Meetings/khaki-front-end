import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {map} from 'rxjs/operators';

import * as OrganizersTablePageableActions from './organizers-table-pageable.actions';
import { loadOrganizersAggregateStatisticsAction } from '../actions/organizers-aggregate-statistics.actions';


@Injectable()
export class OrganizersTablePageableEffects {


  loadOrganizersTablePageables$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrganizersTablePageableActions.setOrganizersTablePageablesAction),
      map(() => loadOrganizersAggregateStatisticsAction())
    );
  });

  constructor(private actions$: Actions) {
  }

}
