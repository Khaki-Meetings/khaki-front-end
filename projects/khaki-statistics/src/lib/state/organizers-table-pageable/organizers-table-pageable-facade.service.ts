import {Injectable} from '@angular/core';
import {StatisticsFeature} from '../models/statistics-feature';
import {Store} from '@ngrx/store';
import {setOrganizersTablePageablesAction} from './organizers-table-pageable.actions';
import {Observable} from 'rxjs';
import {OrganizersTablePageableSm} from './organizers-table-pageable.reducer';
import {selectOrganizersTablePageableState} from './organizers-table-pageable.selectors';

@Injectable({providedIn: 'root'})
export class OrganizersTablePageableFacade {

  constructor(private store: Store<StatisticsFeature>) {
  }

  public setPageable(page: number, count: number): void {
    this.store.dispatch(setOrganizersTablePageablesAction({page, count}));
  }

  public pageable(): Observable<OrganizersTablePageableSm> {
    return this.store.select(selectOrganizersTablePageableState);
  }
}
