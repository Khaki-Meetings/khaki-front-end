import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';
import {StatisticsFeature} from '../models/statistics-feature';
import {Store} from '@ngrx/store';
import {loadTimeBlockSummary} from '../actions/time-block-summaries.actions';
import {timeBlockSummariesFeatureKey} from '../reducers/time-block-summary.reducer';
import {ErrorSm} from '../models/errorSm';

@Injectable({
  providedIn: 'root'
})
export class TimeBlockSummariesFacadeService {

  constructor(private store: Store<StatisticsFeature>) {
  }

  requestTimeBlockSummary(): void {
    this.store.dispatch(loadTimeBlockSummary());
  }

  timeBlockSummary(): Observable<TimeBlockSummarySm> {
    return this.store.select(state => state[timeBlockSummariesFeatureKey]);
  }

  timeBlockSummaryErrors(): Observable<ErrorSm> {
    return this.store.select(state => state[timeBlockSummariesFeatureKey].error);
  }
}
