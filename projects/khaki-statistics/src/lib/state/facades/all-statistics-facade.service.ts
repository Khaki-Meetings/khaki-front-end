import {Injectable} from '@angular/core';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {Store} from '@ngrx/store';
import {loadOrganizersStatisticsAction} from '../actions/organizers-statistics.actions';
import {loadTimeBlockSummary} from '../actions/time-block-summaries.actions';
import {loadPerDepartmentStatistics} from '../actions/per-department-statistics.actions';
import {loadTrailingStatistics} from '../actions/trailing-statistics.actions';
import {loadMeetingsListAction} from '../actions/meetings-list.actions';
import {HistorianService, Logging} from '@natr/historian';
import { loadOrganizersAggregateStatisticsAction } from '../actions/organizers-aggregate-statistics.actions';

@Logging
@Injectable({providedIn: 'root'})
export class AllStatisticsFacadeService {
  private logger: HistorianService;

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  requestAllStatistics(): void {
    this.logger.debug('getting all stats');
    this.store.dispatch(loadOrganizersStatisticsAction());
    this.store.dispatch(loadOrganizersAggregateStatisticsAction());
    this.store.dispatch(loadTimeBlockSummary());
    this.store.dispatch(loadPerDepartmentStatistics());
    this.store.dispatch(loadTrailingStatistics());
    this.store.dispatch(loadMeetingsListAction());
  }
}
