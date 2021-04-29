import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {ErrorSm} from '../models/error-sm';
import {of} from 'rxjs';
import {StatisticsService} from '../../services/statistics.service';
import { loadDepartmentsListAction, loadDepartmentsListFailureAction, loadDepartmentsListSuccessAction } from '../actions/departments-list.actions';

@Injectable()
export class DepartmentsEffects {
  departmentsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadDepartmentsListAction),
      switchMap(
        (action) => this.statisticsService
          .getDepartments()
          .pipe(
            map((departmentStatistics) => loadDepartmentsListSuccessAction(departmentStatistics)),
            catchError(
              (error: ErrorSm) => of(loadDepartmentsListFailureAction(error))
            )
          )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService
  ) {
  }

}
