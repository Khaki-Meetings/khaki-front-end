import {Injectable} from '@angular/core';
import {StatisticsFeature} from '../models/statistics-feature';
import {Store} from '@ngrx/store';
import {setStatisticsFiltersAction} from '../actions/set-statistics-filter.actions';
import {Observable} from 'rxjs';
import {statisticsFiltersFeatureKey, StatisticsFiltersState} from '../reducers/statistics-filters.reducer';

@Injectable({
  providedIn: 'root'
})
export class StatisticsFiltersFacadeService {

  constructor(private store: Store<StatisticsFeature>) {
  }

  public setStatisticsFilter(filter: StatisticsFiltersState): void {
    this.store.dispatch(setStatisticsFiltersAction(filter));
  }

  public statisticsFilters(): Observable<StatisticsFiltersState> {
    return this.store.select(state => state[statisticsFiltersFeatureKey]);
  }
}
