import {Injectable} from '@angular/core';
import {StatisticsFeature} from '../models/statistics-feature';
import {select, Store} from '@ngrx/store';
import {setStatisticsFiltersAction} from '../actions/set-statistics-filter.actions';
import {Observable} from 'rxjs';
import {StatisticsFiltersState} from '../reducers/statistics-filters.reducer';
import {statisticsFilterSelector, statisticsFiltersSelector} from '../statistics.selectors';
import {StatisticsFilterSe} from '../models/statistics-filter-se';
import {setPageCountAction, setStatisticsFilterAction} from '../actions/statistics-filter.actions';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class StatisticsFiltersFacadeService {

  constructor(private store: Store<StatisticsFeature>) {
  }

  public setStatisticsFilters(filter: StatisticsFiltersState): void {
    this.store.dispatch(setStatisticsFiltersAction(filter));
  }

  public setStatisticsFilter(filter: StatisticsFilterSe): void {
    this.store.dispatch(setStatisticsFilterAction({filter}));
  }

  public statisticsFilters(): Observable<StatisticsFiltersState> {
    return this.store.select(statisticsFiltersSelector);
  }

  public currentStatisticsFilter(): Observable<StatisticsFilterSe> {
    return this.store.pipe(
      take(1),
      select(statisticsFilterSelector)
    );
  }

  public setPageAndCount(page: number, count: number): void {
    this.store.dispatch(setPageCountAction({page, count}));
  }
}
