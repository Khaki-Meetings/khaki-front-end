import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TrailingStatisticsSm} from '../models/trailing-statistics-sm';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {Store} from '@ngrx/store';
import {loadTrailingStatistics} from '../actions/trailing-statistics.actions';
import {trailingStatisticsLoadingSelector, trailingStatisticsSelector} from '../statistics.selectors';
import { TrailingStatisticsAggSm } from '../models/trailing-statistics-agg-sm';

@Injectable({
  providedIn: 'root'
})
export class TrailingStatisticsFacadeService {

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  requestTrailingStatistics(): void {
    this.store.dispatch(loadTrailingStatistics());
  }

  trailingStatistics(): Observable<TrailingStatisticsAggSm> {
    return this.store.select(trailingStatisticsSelector);
  }

  trailingStatisticsLoading(): Observable<boolean> {
    return this.store.select(trailingStatisticsLoadingSelector);
  }
}
