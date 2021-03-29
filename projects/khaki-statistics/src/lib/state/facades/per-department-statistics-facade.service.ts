import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {loadPerDepartmentStatistics} from '../actions/per-department-statistics.actions';
import {departmentsStatisticsLoadingSelector, perDepartmentStatisticsSelector} from '../statistics.selectors';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import { DepartmentsStatisticsAggSm } from '../models/departments-statistics-agg-sm';

@Injectable({
  providedIn: 'root'
})
export class PerDepartmentStatisticsFacadeService {

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  requestPerDepartmentStatistics(): void {
    this.store.dispatch(loadPerDepartmentStatistics());
  }

  perDepartmentStatistics(): Observable<DepartmentsStatisticsAggSm> {
    return this.store.select(perDepartmentStatisticsSelector);
  }

  perDepartmentStatisticsLoading(): Observable<boolean> {
    return this.store.select(departmentsStatisticsLoadingSelector);
  }

  perDepartmentStatisticsErrors(): Observable<Error[]> {
    throw new NotImplementedException();
  }
}
