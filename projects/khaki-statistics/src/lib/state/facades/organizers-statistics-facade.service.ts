import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import {StatisticsFeature} from '../models/statistics-feature';
import {Store} from '@ngrx/store';
import {loadOrganizersStatistics} from '../actions/organizers-statistics.actions';
import {organizersStatisticsSelector} from '../statistics.selectors';
import {IntervalEnum} from '../../services/models/interval.enum';

@Injectable({
  providedIn: 'root'
})
export class OrganizersStatisticsFacadeService {

  constructor(private store: Store<StatisticsFeature>) {
  }

  requestOrganizersStatistics(interval: IntervalEnum, count: number, page: number): void {
    this.store.dispatch(loadOrganizersStatistics({interval, count, page}));
  }

  organizersStatistics(): Observable<OrganizersStatisticsSm> {
    return this.store.select(organizersStatisticsSelector);
  }

  setOrganizersStatistics(data: OrganizersStatisticsSm): void {
    throw new NotImplementedException();
  }

}
