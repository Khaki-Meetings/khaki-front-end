import { Injectable } from '@angular/core';
import {KhakiSettingsFeatureSm} from '../khaki-settings-feature-sm';
import {Store} from '@ngrx/store';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {Moment} from 'moment';
import {setStartEndAction} from './set-start-end.actions';
import {Observable} from 'rxjs';
import {statisticsFiltersSelector} from './statistics-filters.selectors';
import {IntervalSe} from './interval-se.enum';
import {setIntervalAction} from './set-interval.actions';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {setStatisticsScopeAction} from './set-statistics-scope.actions';

@Injectable({
  providedIn: 'root'
})
export class StatisticsFiltersFacade {
  constructor(private store: Store<KhakiSettingsFeatureSm>) { }

  dispatchSetStatisticsFilters(statisticsFilters: StatisticsFiltersSm): void {
    this.store.dispatch(setStatisticsFiltersAction({statisticsFilters}));
  }

  public dispatchSetStartEnd(start: Moment, end: Moment): void {
    this.store.dispatch(setStartEndAction({start, end}));
  }

  public selectStatisticsFilters(): Observable<StatisticsFiltersSm> {
    return this.store.select(statisticsFiltersSelector);
  }

  public dispatchSetInterval(interval: IntervalSe): void {
    this.store.dispatch(setIntervalAction({interval}));
  }

  public dispatchSetStatisticsScope(scope: StatisticsScopeSe): void {
    this.store.dispatch(setStatisticsScopeAction({scope}));
  }
}
