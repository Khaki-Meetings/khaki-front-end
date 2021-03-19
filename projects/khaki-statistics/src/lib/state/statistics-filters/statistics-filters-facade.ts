import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {Observable} from 'rxjs';
import {statisticsFiltersSelector, statisticsIntervalSelector, statisticsScopeSelector, statisticsOrganizerSelector} from './statistics-filters.selectors';
import {map, take} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {setStatisticsScopeAction} from './set-statistics-scope.actions';
import {IntervalSe} from './interval-se.enum';
import {setIntervalAction} from './set-interval.actions';
import {setOrganizerAction} from './set-organizer.actions';
import {loadSharedStatisticsAction} from './load-shared-statistics.actions';
import * as momentJs from 'moment/moment';

const moment = momentJs;

@Logging
@Injectable({providedIn: 'root'})
export class StatisticsFiltersFacade {
  // noinspection JSUnusedLocalSymbols
  private logger: HistorianService;

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  public dispatchSetStatisticsFilters(statisticsFilters: StatisticsFiltersSm): void {
    this.logger.debug('new stats', statisticsFilters);
    this.store.dispatch(setStatisticsFiltersAction({statisticsFilters}));
  }

  public dispatchSetInterval(interval: IntervalSe): void {
    this.logger.debug('interval', interval);
    this.store.dispatch(setIntervalAction({interval}));
  }

  public dispatchSetOrganizer(organizer: string): void {
    this.logger.debug('organizer', organizer);
    this.store.dispatch(setOrganizerAction({organizer}));
  }

  public dispatchSetStatisticsScope(filter: StatisticsScopeSe): void {
    this.store.dispatch(setStatisticsScopeAction({scope: filter}));
  }

  public selectStatisticsFilters(): Observable<StatisticsFiltersSm> {
    return this.store.select(statisticsFiltersSelector)
      .pipe(
        map(statisticsFilters => (
            {
              ...statisticsFilters,
              start: moment(statisticsFilters.start),
              end: moment(statisticsFilters.end),
              organizer: statisticsFilters.organizer
            }
          )
        )
      );
  }

  public selectCurrentStatisticsScope(): Observable<StatisticsScopeSe> {
    return this.selectStatisticsScope().pipe(
      take(1)
    );
  }

  public selectInterval(): Observable<IntervalSe> {
    return this.store.select(statisticsIntervalSelector);
  }

  public selectOrganizer(): Observable<string> {
    return this.store.select(statisticsOrganizerSelector);
  }

  public selectStatisticsScope(): Observable<StatisticsScopeSe> {
    return this.store.select(statisticsScopeSelector);
  }

  public dispatchLoadSharedStatistics(): void {
    this.store.dispatch(loadSharedStatisticsAction());
  }
}
