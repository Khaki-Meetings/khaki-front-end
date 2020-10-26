import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PerDepartmentStatistics} from '../models/per-department-statistics';
import {Store} from '@ngrx/store';
import {StatisticsFeature} from '../models/statistics-feature';
import {loadPerDepartmentStatistics} from '../actions/per-department-statistics.actions';
import {perDepartmentStatisticsSelector} from '../statistics.selectors';

@Injectable({
  providedIn: 'root'
})
export class PerDepartmentStatisticsService {

  constructor(private store: Store<StatisticsFeature>) {
  }

  requestPerDepartmentStatistics(): void {
    this.store.dispatch(loadPerDepartmentStatistics());
  }

  perDepartmentStatistics(): Observable<PerDepartmentStatistics> {
    return this.store
      .select(perDepartmentStatisticsSelector);
  }

  perDepartmentStatisticsErrors(): Observable<Error[]> {
    throw new Error('not implemented');
  }
}
throw new Error('not implemented');
