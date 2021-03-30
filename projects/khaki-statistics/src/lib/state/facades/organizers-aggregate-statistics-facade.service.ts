import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NotImplementedException} from '../../exceptions/not-implemented-exception';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {Store} from '@ngrx/store';
import {organizersAggregateStatisticsLoadingSelector, organizersAggregateStatisticsSelector, organizersStatisticsLoadingSelector } from '../statistics.selectors';
import { OrganizersAggregateStatisticsSm } from '../models/organizers-aggregate-statistics-sm';
import { loadOrganizersAggregateStatisticsAction } from '../actions/organizers-aggregate-statistics.actions';

@Injectable({
  providedIn: 'root'
})
export class OrganizersAggregateStatisticsFacadeService {

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  dispatchLoadOrganizersAggregateStatistics():  void {
    this.store.dispatch(loadOrganizersAggregateStatisticsAction());
  }

  selectOrganizersAggregateStatistics(): Observable<OrganizersAggregateStatisticsSm> {
    return this.store.select(organizersAggregateStatisticsSelector);
  }

  selectOrganizersAggregateStatisticsLoading(): Observable<boolean> {
    return this.store.select(organizersAggregateStatisticsLoadingSelector);
  }

  setOrganizersAggregateStatistics(data: OrganizersAggregateStatisticsSm): void {
    throw new NotImplementedException();
  }

}
