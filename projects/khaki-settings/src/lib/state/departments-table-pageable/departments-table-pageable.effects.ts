import {Injectable} from '@angular/core';
import { HistorianService, Logging } from '@natr/historian';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import { loadDepartmentsPageable } from '../actions/departments-pageable.actions';
import { loadDepartments } from '../actions/departments.actions';
import * as DepartmentsTablePageableActions from './departments-table-pageable.actions';

@Logging
@Injectable()
export class DepartmentsTablePageableEffects {

  private logger: HistorianService;

  loadDepartmentsTablePageables$ = createEffect(() => {
    this.logger.debug("loadDepartmentsTablePageables");
    return this.actions$.pipe(
      ofType(DepartmentsTablePageableActions.setDepartmentsTablePageablesAction),
      map(() => loadDepartmentsPageable())
    );
  });

  constructor(private actions$: Actions) {
  }

}
