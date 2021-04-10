import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TimeBlockSummarySm} from '../models/time-block-summary-sm';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {Store} from '@ngrx/store';
import {loadTimeBlockSummary} from '../actions/time-block-summaries.actions';
import {timeBlockSummariesFeatureKey} from '../reducers/time-block-summary.reducer';
import {ErrorSm} from '../models/error-sm';
import {timeBlockSummaryGoalLoadingSelector, timeBlockSummaryGoalsSelector, timeBlockSummaryLoadingSelector, timeBlockSummarySelector} from '../statistics.selectors';
import { loadTimeBlockSummaryGoals } from '../actions/time-block-summary-goals.actions';
import { TimeBlockSummaryGoalSm } from '../models/time-block-summary-goal-sm';
import { timeBlockSummaryGoalsFeatureKey } from '../reducers/time-block-summary-goal-list.reducer';
import { TimeBlockSummaryGoalListSm } from '../models/time-block-summary-goal-list-sm';

@Injectable({
  providedIn: 'root'
})
export class TimeBlockSummaryGoalsFacadeService {

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  requestTimeBlockSummaryGoal(): void {
    this.store.dispatch(loadTimeBlockSummaryGoals());
  }

  timeBlockGoalSummary(): Observable<TimeBlockSummaryGoalListSm> {
    return this.store.select(timeBlockSummaryGoalsSelector);
  }

  timeBlockSummaryGoalLoading(): Observable<boolean> {
    return this.store.select(timeBlockSummaryGoalLoadingSelector);
  }

  timeBlockSummaryGoalErrors(): Observable<ErrorSm> {
    return this.store.select(state => state[timeBlockSummaryGoalsFeatureKey].error);
  }

}
