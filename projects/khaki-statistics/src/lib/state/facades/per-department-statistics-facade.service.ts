import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PerDepartmentStatisticsSm} from '../models/per-department-statistics-sm';
import {Store} from '@ngrx/store';
import {StatisticsFeature} from '../models/statistics-feature';
import {loadPerDepartmentStatistics} from '../actions/per-department-statistics.actions';
import {perDepartmentStatisticsSelector} from '../statistics.selectors';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import {IntervalEnum} from '../../services/models/interval.enum';

@Injectable({
  providedIn: 'root'
})
export class PerDepartmentStatisticsFacadeService {

  constructor(private store: Store<StatisticsFeature>) {
  }

  requestPerDepartmentStatistics(interval: IntervalEnum): void {
    this.store.dispatch(loadPerDepartmentStatistics({interval}));
  }

  perDepartmentStatistics(): Observable<PerDepartmentStatisticsSm> {
    return this.store
      .select(perDepartmentStatisticsSelector);
  }

  perDepartmentStatisticsErrors(): Observable<Error[]> {
    throw new NotImplementedException();
  }
}
