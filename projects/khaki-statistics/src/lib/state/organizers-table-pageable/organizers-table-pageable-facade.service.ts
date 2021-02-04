import {Injectable} from '@angular/core';
import {KhakiStatisticsFeatureSm} from '../models/khaki-statistics-feature-sm';
import {Store} from '@ngrx/store';
import {setOrganizersTablePageablesAction} from './organizers-table-pageable.actions';
import {Observable} from 'rxjs';
import {OrganizersTablePageableSm} from './organizers-table-pageable.reducer';
import {selectOrganizersTablePageableState} from './organizers-table-pageable.selectors';
import {SortDirection} from '@angular/material/sort';

@Injectable({providedIn: 'root'})
export class OrganizersTablePageableFacade {

  constructor(private store: Store<KhakiStatisticsFeatureSm>) {
  }

  public dispatchSetOrganizersTablePageables(page: number, count: number, sortColumn?: string, sortDirection?: SortDirection): void {
    this.store.dispatch(setOrganizersTablePageablesAction({page, count, sortColumn, sortDirection}));
  }

  public selectOrganizersTablePageable(): Observable<OrganizersTablePageableSm> {
    return this.store.select(selectOrganizersTablePageableState);
  }
}
