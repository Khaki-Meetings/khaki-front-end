import { Injectable } from '@angular/core';
import {KhakiSettingsFeatureSm} from '../khaki-settings-feature-sm';
import {Store} from '@ngrx/store';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {StatisticsFiltersSm} from './statistics-filters-sm';

@Injectable({
  providedIn: 'root'
})
export class StatisticsFiltersFacade {
  constructor(private store: Store<KhakiSettingsFeatureSm>) { }

  dispatchSetStatisticsFilters(statisticsFilters: StatisticsFiltersSm): void {
    this.store.dispatch(setStatisticsFiltersAction({statisticsFilters: statisticsFilters}));
  }
}
