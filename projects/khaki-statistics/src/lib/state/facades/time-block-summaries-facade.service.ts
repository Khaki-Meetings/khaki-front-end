import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {Store} from '@ngrx/store';
import {loadTimeBlockSummary} from '../actions/time-block-summaries.actions';
import {timeBlockSummariesFeatureKey} from '../reducers/time-block-summary.reducer';
import {ErrorSm} from '../models/error-sm';
import {timeBlockSummaryLoadingSelector, timeBlockSummarySelector} from '../statistics.selectors';

@Injectable({
  providedIn: 'root'
})
export class TimeBlockSummariesFacadeService {

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  requestTimeBlockSummary(): void {
    this.store.dispatch(loadTimeBlockSummary());
  }

  timeBlockSummary(): Observable<TimeBlockSummarySm> {
    return this.store.select(timeBlockSummarySelector);
  }

  timeBlockSummaryLoading(): Observable<boolean> {
    return this.store.select(timeBlockSummaryLoadingSelector);
  }

  timeBlockSummaryErrors(): Observable<ErrorSm> {
    return this.store.select(state => state[timeBlockSummariesFeatureKey].error);
  }

}
