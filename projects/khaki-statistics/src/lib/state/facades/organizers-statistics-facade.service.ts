import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OrganizersStatisticsSm} from '../models/organizers-statistics-sm';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {Store} from '@ngrx/store';
import {loadOrganizersStatisticsAction} from '../actions/organizers-statistics.actions';
import {organizersStatisticsLoadingSelector, organizersStatisticsSelector} from '../statistics.selectors';

@Injectable({
  providedIn: 'root'
})
export class OrganizersStatisticsFacadeService {

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
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
