import {Injectable} from '@angular/core';
import {StatisticsFeature} from '../models/statistics-feature';
import {Store} from '@ngrx/store';
import {loadOrganizersStatisticsAction} from '../actions/organizers-statistics.actions';
import {loadTimeBlockSummary} from '../actions/time-block-summaries.actions';
import {loadPerDepartmentStatistics} from '../actions/per-department-statistics.actions';
import {loadTrailingStatistics} from '../actions/trailing-statistics.actions';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Injectable({providedIn: 'root'})
export class AllStatisticsFacadeService {
  private logger: HistorianService;

  constructor(private store: Store<StatisticsFeature>) {
  }

  requestAllStatistics(): void {
    this.logger.debug('getting all stats');
    this.store.dispatch(loadOrganizersStatisticsAction());
    this.store.dispatch(loadTimeBlockSummary());
    this.store.dispatch(loadPerDepartmentStatistics());
    this.store.dispatch(loadTrailingStatistics());
  }
}
