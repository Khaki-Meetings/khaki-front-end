import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {Observable} from 'rxjs';
import {Moment} from 'moment';
import {setStartEndAction} from './set-start-end.actions';
import {statisticsFiltersSelector} from './statistics-filters.selectors';
import {setPageCountAction, setStatisticsFilterAction} from '../actions/statistics-filter.actions';
import {take} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {statisticsFilterSelector} from '../statistics.selectors';
import {StatisticsScopeSe} from './statistics-scope-se.enum';

@Logging
@Injectable({providedIn: 'root'})
export class StatisticsFiltersFacade {
  private logger: HistorianService;

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  public dispatchSetStatisticsFilters(statisticsFilters: StatisticsFiltersSm): void {
    this.store.dispatch(setStatisticsFiltersAction({statisticsFilters}));
  }

  public selectStatisticsFilters(): Observable<StatisticsFiltersSm> {
    return this.store.select(statisticsFiltersSelector);
  }

  public dispatchSetStartEndAction(start: Moment, end: Moment): void {
    this.store.dispatch(setStartEndAction({start, end}));
  }

  public setStatisticsFilters(filter: StatisticsFiltersSm): void {
    this.store.dispatch(setStatisticsFiltersAction({statisticsFilters: filter}));
  }

  public setStatisticsFilter(filter: StatisticsScopeSe): void {
    this.logger.debug('filter', filter);
    this.store.dispatch(setStatisticsFilterAction({filter}));
  }

  public statisticsFilters(): Observable<StatisticsFiltersSm> {
    return this.store.select(statisticsFiltersSelector);
  }

  public currentStatisticsFilter(): Observable<StatisticsScopeSe> {
    return this.store.pipe(
      take(1),
      select(statisticsFilterSelector)
    );
  }

  public setPageAndCount(page: number, count: number): void {
    this.store.dispatch(setPageCountAction({page, count}));
  }
}
