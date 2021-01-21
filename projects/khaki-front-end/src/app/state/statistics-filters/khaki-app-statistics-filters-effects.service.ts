import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HistorianService, Logging} from '@natr/historian';
import {tap, withLatestFrom} from 'rxjs/operators';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {StatisticsFiltersFacade as SettingsModuleStatisticsFiltersFacade} from 'khaki-settings';
import {StatisticsFiltersFacade as StatisticsModuleStatisticsFiltersFacade} from 'khaki-statistics';
import {Store} from '@ngrx/store';
import {KhakiState} from '../reducers';
import {statisticsFiltersAttributeKey} from './statistics-filters.reducer';


@Logging
@Injectable()
export class KhakiAppStatisticsFiltersEffects {
  private logger: HistorianService;

  khakiAppSetStatisticsFiltersEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(setStatisticsFiltersAction),
      tap(action => this.logger.debug('action', action)),
      withLatestFrom(
        this.store.select(state => state[statisticsFiltersAttributeKey])
      ),
      tap(joined => {
        this.logger.debug('joined', joined);
        this.statisticsModuleStatisticsFiltersFacade.dispatchSetStatisticsFilters(joined[1]);
        this.settingsModuleStatisticsFiltersFacade.dispatchSetStatisticsFilters(joined[1]);
      }),
    ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private settingsModuleStatisticsFiltersFacade: SettingsModuleStatisticsFiltersFacade,
    private statisticsModuleStatisticsFiltersFacade: StatisticsModuleStatisticsFiltersFacade,
    private store: Store<KhakiState>
  ) {
  }

}
