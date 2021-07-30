import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, tap, switchMap, withLatestFrom} from 'rxjs/operators';
import {SettingsService} from '../../services/settings.service';
import {of} from 'rxjs';
import { loadDepartments, loadDepartmentsSuccess } from '../actions/departments.actions';
import { DepartmentsTablePageableSm } from '../departments-table-pageable/departments-table-pageable.reducer';
import { loadDepartmentsPageable, loadDepartmentsPageableSuccess } from '../actions/departments-pageable.actions';
import { DepartmentsTablePageableFacade } from '../departments-table-pageable/departments-table-pageable-facade.service';


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

  departmentsPageableEffect$ = createEffect(
      () => this.actions$.pipe(
        ofType(loadDepartmentsPageable),
        withLatestFrom(
          this.departmentsTablePageableFacade.selectDepartmentsTablePageable()
        ),
        switchMap(
          (action) => {
            console.log('departmentsPageableEffect', action[0]);
            console.log('departmentsPageableEffect', action[1]);
            return this.settingsService.getDepartmentsPageable(action[1])
            .pipe(
              map(departments => loadDepartmentsPageableSuccess(departments))
            )
          }
        )
      )
    );

  constructor(private actions$: Actions,
    private settingsService: SettingsService,
    private departmentsTablePageableFacade: DepartmentsTablePageableFacade) {
  }

}
