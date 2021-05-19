import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {BaseChildrenStatisticsFiltersEffects} from './base-children-statistics-filters.effects';
import {setIntervalAction, setDepartmentAction, setOrganizerAction, setStatisticsScopeAction} from 'khaki-statistics';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';


@Logging
@Injectable()
export class StatisticsModuleStatisticsFiltersEffects extends BaseChildrenStatisticsFiltersEffects {
  private logger: HistorianService;

  statisticsSetIntervalEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setIntervalAction),
      map(action => {
        console.log('effect', action); // was natr-historian  this.logger.debug
        return setStatisticsFiltersAction({interval: action.interval});
      }),
    )
  );

  statisticsSetDepartmentEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setDepartmentAction),
      map(action => {
        console.log('effect', action); // was natr-historian  this.logger.debug
        return setStatisticsFiltersAction({department: action.department});
      }),
    )
  );

  statisticsSetOrganizerEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setOrganizerAction),
      map(action => {
        console.log('effect', action); // was natr-historian  this.logger.debug
        return setStatisticsFiltersAction({organizer: action.organizer});
      }),
    )
  );

  statisticsSetStatisticsScopeEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setStatisticsScopeAction),
      map(action => {
        console.log('effect', action); // was natr-historian  this.logger.debug
        return setStatisticsFiltersAction({statisticsScope: action.scope});
      }),
    )
  );

  constructor(private actions$: Actions) {
    super();
  }
}
