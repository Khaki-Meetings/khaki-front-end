import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import { loadEmployees } from '../actions/employees.actions';
import * as EmployeesTablePageableActions from './employees-table-pageable.actions';

@Injectable()
export class EmployeesTablePageableEffects {

  loadEmployeesTablePageables$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeesTablePageableActions.setEmployeesTablePageablesAction),
      map(() => loadEmployees())
    );
  });

  constructor(private actions$: Actions) {
  }

}
