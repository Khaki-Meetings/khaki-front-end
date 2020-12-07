import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, tap, switchMap} from 'rxjs/operators';
import {SettingsService} from '../../services/settings.service';
import {of} from 'rxjs';
import { loadEmployees, loadEmployeesSuccess } from '../actions/employees.actions';


@Injectable()
export class EmployeesEffects {

  employeesEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadEmployees),
      switchMap(
        (action) => this.settingsService.getEmployees()
          .pipe(
            map(employees => loadEmployeesSuccess(employees))
          )
      )
    )
  );

  constructor(private actions$: Actions, private settingsService: SettingsService) {
  }

}
