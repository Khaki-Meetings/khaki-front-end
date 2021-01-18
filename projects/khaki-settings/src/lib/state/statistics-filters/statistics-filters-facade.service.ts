import { Injectable } from '@angular/core';
import {KhakiSettingsFeatureSm} from '../khaki-settings-feature-sm';
import {Store} from '@ngrx/store';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {Moment} from 'moment';
import {setStartEndAction} from './set-start-end.actions';
import {Observable} from 'rxjs';
import {statisticsFiltersSelector} from './statistics-filters.selectors';

@Injectable({
  providedIn: 'root'
})
export class StatisticsFiltersFacade {
  constructor(private store: Store<KhakiSettingsFeatureSm>) { }

  dispatchSetStatisticsFilters(statisticsFilters: StatisticsFiltersSm): void {
    this.store.dispatch(setStatisticsFiltersAction({statisticsFilters}));
  }

  public dispatchSetStartEndAction(start: Moment, end: Moment): void {
    this.store.dispatch(setStartEndAction({start, end}));
  }

  public selectStatisticsFilters(): Observable<StatisticsFiltersSm> {
    return this.store.select(statisticsFiltersSelector);
  }
}
