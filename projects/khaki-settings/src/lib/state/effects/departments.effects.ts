import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, tap, switchMap} from 'rxjs/operators';
import {SettingsService} from '../../services/settings.service';
import {of} from 'rxjs';
import { loadDepartments, loadDepartmentsSuccess } from '../actions/departments.actions';


@Injectable()
export class DepartmentsEffects {

  departmentsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadDepartments),
      switchMap(
        (action) => this.settingsService.getDepartments()
          .pipe(
            map(departments => loadDepartmentsSuccess(departments))
          )
      )
    )
  );

  constructor(private actions$: Actions, private settingsService: SettingsService) {
  }

}
