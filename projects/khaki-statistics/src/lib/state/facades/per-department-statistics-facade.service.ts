import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DepartmentsStatisticsSm} from '../models/departments-statistics-sm';
import {Store} from '@ngrx/store';
import {StatisticsFeature} from '../models/statistics-feature';
import {loadPerDepartmentStatistics} from '../actions/per-department-statistics.actions';
import {departmentsStatisticsLoadingSelector, perDepartmentStatisticsSelector} from '../statistics.selectors';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';

@Injectable({
  providedIn: 'root'
})
export class PerDepartmentStatisticsFacadeService {

  constructor(private store: Store<StatisticsFeature>) {
  }

  requestPerDepartmentStatistics(): void {
    this.store.dispatch(loadPerDepartmentStatistics());
  }

  perDepartmentStatistics(): Observable<DepartmentsStatisticsSm> {
    return this.store.select(perDepartmentStatisticsSelector);
  }

  perDepartmentStatisticsLoading(): Observable<boolean> {
    return this.store.select(departmentsStatisticsLoadingSelector);
  }

  perDepartmentStatisticsErrors(): Observable<Error[]> {
    throw new NotImplementedException();
  }
}
