import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import { setEmployeesTablePageablesAction } from './employees-table-pageable.actions';
import { EmployeesTablePageableSm } from './employees-table-pageable.reducer';
import { selectEmployeesTablePageableState } from './employees-table-pageable.selectors';
import { KhakiSettingsFeatureSm } from '../khaki-settings-feature-sm';

@Injectable({providedIn: 'root'})
export class EmployeesTablePageableFacade {

  constructor(private store: Store<KhakiSettingsFeatureSm>) {
  }

  public dispatchSetEmployeesTablePageables(page: number, count: number, sortColumn?: string, sortDirection?: SortDirection): void {
    this.store.dispatch(setEmployeesTablePageablesAction({page, count, sortColumn, sortDirection}));
  }

  public selectEmployeesTablePageable(): Observable<EmployeesTablePageableSm> {
    return this.store.select(selectEmployeesTablePageableState);
  }
}
