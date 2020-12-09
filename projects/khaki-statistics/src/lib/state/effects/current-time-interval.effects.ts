import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {tap} from 'rxjs/operators';
import {StatisticsFeature} from '../models/statistics-feature';
import {Store} from '@ngrx/store';
import {loadOrganizersStatistics} from '../actions/organizers-statistics.actions';
import {loadTimeBlockSummary} from '../actions/time-block-summaries.actions';
import {loadPerDepartmentStatistics} from '../actions/per-department-statistics.actions';


@Injectable()
export class CurrentTimeIntervalEffects {

  effect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setCurrentTimeIntervalAction),
      tap(
        (action) => {
          this.store.dispatch(loadOrganizersStatistics(action));
          this.store.dispatch(loadTimeBlockSummary(action));
          this.store.dispatch(loadPerDepartmentStatistics(action));
        }
      )
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private store: Store<StatisticsFeature>) {
  }

}
