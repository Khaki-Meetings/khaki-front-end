import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {StatisticsFiltersSm} from './statistics-filters-sm';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {setStatisticsFiltersAction} from './set-statistics-filters.actions';
import {Observable} from 'rxjs';
import {statisticsFiltersSelector, statisticsIntervalSelector, statisticsScopeSelector, statisticsOrganizerSelector, statisticsDepartmentSelector, statisticsAttendeeSelector} from './statistics-filters.selectors';
import {map, take} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {StatisticsScopeSe} from './statistics-scope-se.enum';
import {setStatisticsScopeAction} from './set-statistics-scope.actions';
import {IntervalSe} from './interval-se.enum';
import {setIntervalAction} from './set-interval.actions';
import * as momentJs from 'moment/moment';
import { setDepartmentAction } from './set-department.actions';
import { loadDepartmentsListAction } from '../actions/departments-list.actions';
import { DepartmentSm } from '../models/department-sm';
import { loadSharedStatisticsAction } from './load-shared-statistics.actions';
const moment = momentJs;

@Logging
@Injectable({providedIn: 'root'})
export class StatisticsFiltersFacade {
  // noinspection JSUnusedLocalSymbols
  private logger: HistorianService;

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  public dispatchSetStatisticsFilters(statisticsFilters: StatisticsFiltersSm): void {
    this.logger.debug('teams dispatchSetStatisticsFilters', statisticsFilters);
    this.store.dispatch(setStatisticsFiltersAction({statisticsFilters}));
  }

  public dispatchSetInterval(interval: IntervalSe): void {
    this.logger.debug('dispatchSetInterval', interval);
    this.store.dispatch(setIntervalAction({interval}));
  }

  public dispatchSetDepartment(department: string): void {
    this.logger.debug('dispatchSetDepartment', department);
    this.store.dispatch(setDepartmentAction({department}));
  }

  public dispatchSetStatisticsScope(filter: StatisticsScopeSe): void {
    this.logger.debug('dispatchSetStatisticsScope', filter);
    this.store.dispatch(setStatisticsScopeAction({scope: filter}));
  }

  public selectStatisticsFilters(): Observable<StatisticsFiltersSm> {
    this.logger.debug('StatisticsFiltersFacade selectStatisticsFilters');
    return this.store.select(statisticsFiltersSelector)
      .pipe(
        map(statisticsFilters => (
            {
              ...statisticsFilters,
              start: moment(statisticsFilters.start),
              end: moment(statisticsFilters.end),
              calendarStart: moment(statisticsFilters.calendarStart),
              calendarEnd: moment(statisticsFilters.calendarEnd),
              organizer: statisticsFilters.organizer,
              department: statisticsFilters.department,
              attendee: statisticsFilters.attendee
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

  public selectAttendee(): Observable<string> {
    return this.store.select(statisticsAttendeeSelector);
  }

  public selectDepartment(): Observable<string> {
    return this.store.select(statisticsDepartmentSelector);
  }

  public selectStatisticsScope(): Observable<StatisticsScopeSe> {
    return this.store.select(statisticsScopeSelector);
  }

  public dispatchLoadDepartments(): void {
    this.store.dispatch(loadDepartmentsListAction());
  }

  public dispatchLoadSharedStatistics(): void {
    this.store.dispatch(loadSharedStatisticsAction());
  }
}
