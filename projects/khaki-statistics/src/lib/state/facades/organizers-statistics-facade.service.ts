import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import {StatisticsFeature} from '../models/statistics-feature';
import {Store} from '@ngrx/store';
import {loadOrganizersStatisticsAction} from '../actions/organizers-statistics.actions';
import {organizersStatisticsLoadingSelector, organizersStatisticsSelector} from '../statistics.selectors';

@Injectable({
  providedIn: 'root'
})
export class OrganizersStatisticsFacadeService {

  constructor(private store: Store<StatisticsFeature>) {
  }

  requestOrganizersStatistics(): void {
    this.store.dispatch(loadOrganizersStatisticsAction());
  }

  organizersStatistics(): Observable<OrganizersStatisticsSm> {
    return this.store.select(organizersStatisticsSelector);
  }

  organizersStatisticsLoading(): Observable<boolean> {
    return this.store.select(organizersStatisticsLoadingSelector);
  }

  setOrganizersStatistics(data: OrganizersStatisticsSm): void {
    throw new NotImplementedException();
  }

}
