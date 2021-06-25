import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, tap, switchMap, withLatestFrom} from 'rxjs/operators';
import {SettingsService} from '../../services/settings.service';
import {of} from 'rxjs';
import { loadEmployees, loadEmployeesSuccess } from '../actions/employees.actions';
import { EmployeesTablePageableFacade } from '../employees-table-pageable/employees-table-pageable-facade.service';

@Injectable()
export class EmployeesEffects {

  employeesEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadEmployees),
      withLatestFrom(
        this.employeesTablePageableFacade.selectEmployeesTablePageable()
      ),
      switchMap(
        (action) => {
          console.log('employeesEffect', action[0]);
          console.log('employeesEffect', action[1]);
          return this.settingsService.getEmployees(action[1])
          .pipe(
            map(employees => loadEmployeesSuccess(employees))
          )
        }
      )
    )
  );

  constructor(private actions$: Actions,
    private settingsService: SettingsService,
    private employeesTablePageableFacade: EmployeesTablePageableFacade) {
  }

}
