import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {setCurrentTimeIntervalAction} from '../actions/current-time-interval.actions';
import {tap} from 'rxjs/operators';
import {StatisticsFeature} from '../models/statistics-feature';
import {Store} from '@ngrx/store';
import {loadOrganizersStatistics} from '../actions/organizers-statistics.actions';
import {loadTimeBlockSummary} from '../actions/time-block-summaries.actions';
import {loadPerDepartmentStatistics} from '../actions/per-department-statistics.actions';
import {loadTrailingStatistics} from '../actions/trailing-statistics.actions';
import {setStatisticsFiltersAction} from '../actions/set-statistics-filter.actions';


@Injectable()
export class StatisticsFiltersChangeEffects {

  effect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setCurrentTimeIntervalAction, setStatisticsFiltersAction),
      tap(
        () => {
          this.store.dispatch(loadOrganizersStatistics());
          this.store.dispatch(loadTimeBlockSummary());
          this.store.dispatch(loadPerDepartmentStatistics());
          this.store.dispatch(loadTrailingStatistics());
        }
      )
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private store: Store<StatisticsFeature>) {
  }

}
