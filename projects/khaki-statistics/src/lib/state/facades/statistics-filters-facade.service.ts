import {Injectable} from '@angular/core';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {select, Store} from '@ngrx/store';
import {setStatisticsFiltersAction} from '../actions/set-statistics-filter.actions';
import {Observable} from 'rxjs';
import {StatisticsFiltersSm} from '../reducers/statistics-filters.reducer';
import {statisticsFilterSelector, statisticsFiltersSelector} from '../statistics.selectors';
import {StatisticsFilterSe} from '../models/statistics-filter-se';
import {setPageCountAction, setStatisticsFilterAction} from '../actions/statistics-filter.actions';
import {take} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Injectable({providedIn: 'root'})
export class StatisticsFiltersFacadeService {
  private logger: HistorianService;

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  public setStatisticsFilters(filter: StatisticsFiltersSm): void {
    this.store.dispatch(setStatisticsFiltersAction(filter));
  }

  public setStatisticsFilter(filter: StatisticsFilterSe): void {
    this.logger.debug('filter', filter);
    this.store.dispatch(setStatisticsFilterAction({filter}));
  }

  public statisticsFilters(): Observable<StatisticsFiltersSm> {
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
