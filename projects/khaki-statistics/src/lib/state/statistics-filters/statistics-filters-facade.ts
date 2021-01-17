import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {Observable} from 'rxjs';
import {Moment} from 'moment';
import {setStartEndAction} from './set-start-end.actions';
import {statisticsFiltersSelector} from './statistics-filters.selectors';

@Injectable({
  providedIn: 'root'
})
export class StatisticsFiltersFacade {

  constructor(private store: Store<KhakiStatisticsFeatureSm>) { }

  public dispatchSetStatisticsFilters(statisticsFilters: StatisticsFiltersSm): void {
    this.store.dispatch(setStatisticsFiltersAction({statisticsFilters}));
  }

  public selectStatisticsFilters(): Observable<StatisticsFiltersSm> {
    return this.store.select(statisticsFiltersSelector);
  }

  public dispatchSetStartEndAction(start: Moment, end: Moment): void {
    this.store.dispatch(setStartEndAction({ start, end }));
  }
}
